<script setup lang="ts">
defineProps<{
  client?: string
  developedAt?: string
  designCredits?: string
  nextTitle?: string
  nextPath?: string
}>()
</script>

<template>
  <section class="project-credits-slide">
    <dl v-if="client || developedAt || designCredits" class="project-credits-slide__list">
      <template v-if="client">
        <dt class="label">Client</dt>
        <dd>{{ client }}</dd>
      </template>
      <template v-if="developedAt">
        <dt class="label">Developed at</dt>
        <dd>{{ developedAt }}</dd>
      </template>
      <template v-if="designCredits">
        <dt class="label">Design</dt>
        <dd>{{ designCredits }}</dd>
      </template>
    </dl>

    <NuxtLink
      v-if="nextPath"
      :to="nextPath"
      class="project-credits-slide__next"
    >
      <span class="label">Next</span>
      <span class="project-credits-slide__next-title">{{ nextTitle }}</span>
    </NuxtLink>
  </section>
</template>

<style scoped>
.project-credits-slide {
  min-height: var(--viewport-section);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--page-gutter);
  padding-top: var(--space-xl);
  padding-bottom: var(--space-xl);
}

.project-credits-slide__list {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: var(--space-sm) var(--space-lg);
  align-items: baseline;
  max-width: 32rem;
  align-self: flex-end;
  margin: 0;
}

.project-credits-slide__list dt {
  color: var(--color-fg-muted);
}

.project-credits-slide__list dd {
  margin: 0;
  font-family: var(--font-serif);
}

.project-credits-slide__next {
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  text-align: right;
}

.project-credits-slide__next-title {
  font-family: var(--font-serif);
  font-size: var(--text-heading);
}

@media (max-width: 900px) {
  .project-credits-slide__list,
  .project-credits-slide__next {
    align-self: flex-start;
    text-align: left;
  }
}
</style>
