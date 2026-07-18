export interface ChainEntry {
  path: string
  title: string
}

export async function useChainSequence() {
  return useAsyncData('chain-sequence', async () => {
    const [projects, artworks] = await Promise.all([
      queryCollection('projects').order('order', 'ASC').all(),
      queryCollection('artworks').order('order', 'ASC').all(),
    ])

    return [
      { path: '/', title: 'Home' },
      ...projects.map(project => ({ path: `/projects/${project.slug}`, title: project.title })),
      ...artworks.map(artwork => ({ path: `/artworks/${artwork.slug}`, title: artwork.title })),
      { path: '/contact', title: 'Contact' },
    ] satisfies ChainEntry[]
  })
}

export function useScrollDirection() {
  return useState<'up' | 'down' | null>('scroll-chain-direction', () => null)
}

function useIsChainNavigating() {
  return useState('scroll-chain-navigating', () => false)
}

export async function useScrollChainNavigation() {
  const route = useRoute()
  const direction = useScrollDirection()
  const isNavigating = useIsChainNavigating()
  const { data: sequence } = await useChainSequence()

  async function navigate(dir: 'up' | 'down') {
    if (isNavigating.value) return
    const seq = sequence.value
    if (!seq) return
    const currentIndex = seq.findIndex(entry => entry.path === route.path)
    if (currentIndex === -1) return
    const targetIndex = dir === 'down' ? currentIndex + 1 : currentIndex - 1
    if (targetIndex < 0 || targetIndex >= seq.length) return

    isNavigating.value = true
    direction.value = dir
    await navigateTo(seq[targetIndex]?.path ?? '/')
    setTimeout(() => {
      isNavigating.value = false
    }, 700)
  }

  return { navigate, direction }
}
