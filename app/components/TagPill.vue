<template>
  <span class="tag-pill">
    <slot />
  </span>
</template>

<style scoped>
.tag-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-fg);
}
</style>
