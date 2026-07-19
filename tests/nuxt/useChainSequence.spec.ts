import { describe, expect, it } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useChainSequence } from '~/composables/useScrollChain'

// Deliberately returned in a shuffled order (not sorted by `order`, not
// alphabetical by slug) — the composable trusts Nuxt Content's own
// `.order('order', 'ASC')` to have already sorted these, so this proves
// useChainSequence assembles the sequence without silently reordering it.
mockNuxtImport('queryCollection', () => {
  return (name: 'projects' | 'artworks') => ({
    order: () => ({
      all: async () =>
        name === 'projects'
          ? [
              { slug: 'project-b', title: 'Project B', order: 2 },
              { slug: 'project-a', title: 'Project A', order: 1 },
            ]
          : [
              { slug: 'artwork-b', title: 'Artwork B', order: 2 },
              { slug: 'artwork-a', title: 'Artwork A', order: 1 },
            ],
    }),
  })
})

describe('useChainSequence', () => {
  it('starts with home and ends with contact', async () => {
    const { data: sequence } = await useChainSequence()

    expect(sequence.value?.at(0)).toEqual({ path: '/', title: 'Home' })
    expect(sequence.value?.at(-1)).toEqual({ path: '/contact', title: 'Contact' })
  })

  it('maps projects to /projects/:slug in the order the query returned them', async () => {
    const { data: sequence } = await useChainSequence()

    expect(sequence.value?.slice(1, 3)).toEqual([
      { path: '/projects/project-b', title: 'Project B' },
      { path: '/projects/project-a', title: 'Project A' },
    ])
  })

  it('places artworks after all projects, mapped to /artworks/:slug', async () => {
    const { data: sequence } = await useChainSequence()

    expect(sequence.value?.slice(3, 5)).toEqual([
      { path: '/artworks/artwork-b', title: 'Artwork B' },
      { path: '/artworks/artwork-a', title: 'Artwork A' },
    ])
  })

  it('produces exactly: home, 2 projects, 2 artworks, contact', async () => {
    const { data: sequence } = await useChainSequence()

    expect(sequence.value).toHaveLength(6)
  })
})
