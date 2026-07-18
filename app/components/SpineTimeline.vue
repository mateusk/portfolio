<script setup lang="ts">
defineProps<{
  label: string
  ticks: number
}>()
</script>

<template>
  <div class="spine-timeline" aria-hidden="true">
    <span class="spine-timeline__label label">{{ label }}</span>
    <div class="spine-timeline__line">
      <span
        v-for="tick in ticks"
        :key="tick"
        class="spine-timeline__tick"
      />
    </div>
  </div>
</template>

<style scoped>
.spine-timeline {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--page-gutter);
  width: 1px;
  display: none;
}

.spine-timeline__label {
  position: absolute;
  top: 0;
  left: 0.75rem;
  white-space: nowrap;
  color: var(--color-fg-muted);
}

.spine-timeline__line {
  position: relative;
  height: 100%;
  background: var(--color-border);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.spine-timeline__tick {
  width: 8px;
  height: 1px;
  background: var(--color-border);
  transform: translateX(-3.5px);
}

@media (min-width: 900px) {
  .spine-timeline {
    display: block;
  }
}
</style>
