<script setup lang="ts">
defineProps<{
  device: 'desktop' | 'tablet' | 'phone'
  image: string
  alt?: string
}>()
</script>

<template>
  <div class="device-mockup" :class="`device-mockup--${device}`">
    <div v-if="device === 'desktop'" class="device-mockup__bar">
      <span />
      <span />
      <span />
    </div>
    <div class="device-mockup__screen">
      <NuxtImg :src="image" :alt="alt ?? ''" />
    </div>
  </div>
</template>

<style scoped>
.device-mockup {
  background: var(--color-bg-elevated);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.45);
}

.device-mockup--desktop {
  width: min(56rem, 90%);
}

.device-mockup--tablet {
  width: min(30rem, 70%);
  border-radius: 1.25rem;
  padding: 0.75rem;
}

.device-mockup--phone {
  width: min(16rem, 60%);
  border-radius: 1.75rem;
  padding: 0.5rem;
}

.device-mockup__bar {
  display: flex;
  gap: 0.4rem;
  padding: 0.6rem 0.8rem;
}

.device-mockup__bar span {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--color-border);
}

.device-mockup__screen {
  overflow: hidden;
  border-radius: inherit;
}

.device-mockup--tablet .device-mockup__screen,
.device-mockup--phone .device-mockup__screen {
  border-radius: 0.75rem;
}
</style>
