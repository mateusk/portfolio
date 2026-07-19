import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useScrollChainNavigation, useScrollDirection } from '~/composables/useScrollChain'

// mockNuxtImport calls are hoisted above the rest of this file (like
// vi.mock), so anything their factories close over must be created via
// vi.hoisted() to avoid a "cannot access before initialization" error.
//
// `mockRoute` is the exact object `useRoute()` returns — the composable only
// calls `useRoute()` once and holds onto that reference, so navigateTo must
// mutate this same object in place rather than reassigning `mockRoute.path`
// (a fresh `{ path: ... }` object each call would go stale after the first
// navigation, same as it would for the real reactive route object if we
// didn't preserve identity).
const mockRoute = vi.hoisted(() => ({ path: '/' }))
const navigateToMock = vi.hoisted(() =>
  vi.fn(async (path: string) => {
    mockRoute.path = path
  }),
)

// Fixed 4-entry sequence: Home -> Project A -> Project B -> Contact.
// (One fake project, empty artworks, so useChainSequence's real assembly
// logic produces exactly this shape from the mocked query.)
mockNuxtImport('queryCollection', () => {
  return (name: 'projects' | 'artworks') => ({
    order: () => ({
      all: async () =>
        name === 'projects'
          ? [
              { slug: 'a', title: 'Project A', order: 1 },
              { slug: 'b', title: 'Project B', order: 2 },
            ]
          : [],
    }),
  })
})

mockNuxtImport('useRoute', () => {
  return () => mockRoute
})

mockNuxtImport('navigateTo', () => navigateToMock)

describe('useScrollChainNavigation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mockRoute.path = '/'
    navigateToMock.mockClear()
    useScrollDirection().value = null
  })

  afterEach(() => {
    // Flush the 700ms isNavigating-reset lock so it doesn't leak into the
    // next test (isNavigating is a useState singleton shared across `it`
    // blocks in this file).
    vi.advanceTimersByTime(1000)
    vi.useRealTimers()
  })

  it('does not navigate past the first entry (up from home)', async () => {
    const { navigate } = await useScrollChainNavigation()
    await navigate('up')
    expect(navigateToMock).not.toHaveBeenCalled()
  })

  it('does not navigate past the last entry (down from contact)', async () => {
    mockRoute.path = '/contact'
    const { navigate } = await useScrollChainNavigation()
    await navigate('down')
    expect(navigateToMock).not.toHaveBeenCalled()
  })

  it('navigates to the next entry and records the direction', async () => {
    mockRoute.path = '/projects/a'
    const { navigate, direction } = await useScrollChainNavigation()
    await navigate('down')
    expect(navigateToMock).toHaveBeenCalledExactlyOnceWith('/projects/b')
    expect(direction.value).toBe('down')
  })

  it('navigates to the previous entry when going up', async () => {
    mockRoute.path = '/projects/b'
    const { navigate, direction } = await useScrollChainNavigation()
    await navigate('up')
    expect(navigateToMock).toHaveBeenCalledExactlyOnceWith('/projects/a')
    expect(direction.value).toBe('up')
  })

  it('ignores a second navigate() call while one is already in flight', async () => {
    mockRoute.path = '/projects/a'
    const { navigate } = await useScrollChainNavigation()
    await navigate('down')
    await navigate('down') // isNavigating is still true — the 700ms lock hasn't elapsed
    expect(navigateToMock).toHaveBeenCalledTimes(1)
  })

  it('allows navigation again once the 700ms lock elapses', async () => {
    mockRoute.path = '/projects/a'
    const { navigate } = await useScrollChainNavigation()
    await navigate('down') // -> /projects/b, locks for 700ms
    vi.advanceTimersByTime(700)
    await navigate('down') // currentPath is now /projects/b -> should proceed to /contact
    expect(navigateToMock).toHaveBeenCalledTimes(2)
    expect(navigateToMock).toHaveBeenLastCalledWith('/contact')
  })
})
