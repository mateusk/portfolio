export async function useNextProject(currentOrder: number) {
  const { data: projects } = await useAsyncData('projects-ordered', () =>
    queryCollection('projects').order('order', 'ASC').all(),
  )

  const next = computed(() => {
    const list = projects.value ?? []
    if (!list.length) return undefined
    const currentIndex = list.findIndex(project => project.order === currentOrder)
    if (currentIndex === -1) return undefined
    const nextIndex = (currentIndex + 1) % list.length
    return list[nextIndex]
  })

  return { next }
}
