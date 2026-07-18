<script setup lang="ts">
withDefaults(defineProps<{
  href?: string
  external?: boolean
}>(), {
  href: undefined,
  external: true,
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href && external ? '_blank' : undefined"
    :rel="href && external ? 'noopener noreferrer' : undefined"
    class="button"
  >
    <span class="label"><slot /></span>
    <IconsIconArrow class="button__arrow" />
  </component>
</template>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-md);
  padding: 0.9rem 1.75rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-fg);
  cursor: pointer;
}

.button__arrow {
  width: 28px;
  height: 6px;
}
</style>
