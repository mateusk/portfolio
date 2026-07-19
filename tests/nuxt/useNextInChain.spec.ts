import { describe, expect, it } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useNextInChain } from '~/composables/useNextInChain'

// Same fixed sequence shape as useChainSequence.spec.ts: Home -> Project A ->
// Project B -> Artwork A -> Contact.
mockNuxtImport('queryCollection', () => {
  return (name: 'projects' | 'artworks') => ({
    order: () => ({
      all: async () =>
        name === 'projects'
          ? [
              { slug: 'a', title: 'Project A', order: 1 },
              { slug: 'b', title: 'Project B', order: 2 },
            ]
          : [{ slug: 'a', title: 'Artwork A', order: 1 }],
    }),
  })
})

describe('useNextInChain', () => {
  it('resolves the following entry for a mid-sequence path', async () => {
    const { next } = await useNextInChain('/projects/a')
    expect(next.value).toEqual({ path: '/projects/b', title: 'Project B' })
  })

  it('resolves undefined for the last entry in the sequence', async () => {
    const { next } = await useNextInChain('/contact')
    expect(next.value).toBeUndefined()
  })

  it('resolves undefined for a path that is not in the sequence at all', async () => {
    const { next } = await useNextInChain('/projects/does-not-exist')
    expect(next.value).toBeUndefined()
  })
})
