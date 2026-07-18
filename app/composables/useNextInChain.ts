export async function useNextInChain(currentPath: string) {
  const { data: sequence } = await useChainSequence()

  const next = computed(() => {
    const seq = sequence.value
    if (!seq) return undefined
    const currentIndex = seq.findIndex(entry => entry.path === currentPath)
    if (currentIndex === -1 || currentIndex === seq.length - 1) return undefined
    return seq[currentIndex + 1]
  })

  return { next }
}
