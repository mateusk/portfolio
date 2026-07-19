<script setup lang="ts">
defineProps<{
  heroImage: string
  tagline: string
  description: string
  tags: string[]
  liveUrl?: string
}>()
</script>

<template>
  <section class="project-hero-slide">
    <div class="project-hero-slide__media">
      <NuxtImg :src="heroImage" alt="" />
    </div>
    <div class="project-hero-slide__vignette" />

    <div class="project-hero-slide__content">
      <h2 class="project-hero-slide__tagline">{{ tagline }}</h2>

      <div class="project-hero-slide__details">
        <p class="project-hero-slide__description">{{ description }}</p>

        <div v-if="tags.length" class="project-hero-slide__tags">
          <TagPill v-for="tag in tags" :key="tag">{{ tag }}</TagPill>
        </div>

        <Button v-if="liveUrl" :href="liveUrl">Visit the website</Button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-hero-slide {
  position: relative;
  min-height: var(--viewport-section);
  display: flex;
  align-items: flex-end;
  padding: var(--page-gutter);
  padding-bottom: var(--space-xl);
  overflow: hidden;
}

.project-hero-slide__media,
.project-hero-slide__vignette {
  position: absolute;
  inset: 0;
}

.project-hero-slide__media {
  background: var(--color-bg-elevated);
}

.project-hero-slide__media :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-hero-slide__vignette {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, var(--color-vignette) 100%);
}

.project-hero-slide__content {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--space-xl);
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.project-hero-slide__tagline {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: var(--text-display);
  line-height: 1.3;
  margin: 0;
  max-width: 22rem;
  min-width: 0;
}

.project-hero-slide__details {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  max-width: 26rem;
  min-width: 0;
  justify-self: end;
}

.project-hero-slide__description {
  color: var(--color-fg-muted);
  margin: 0;
}

.project-hero-slide__tags {
  display: flex;
  gap: var(--space-xs);
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .project-hero-slide__content {
    grid-template-columns: 1fr;
  }

  .project-hero-slide__details {
    justify-self: start;
  }
}
</style>
