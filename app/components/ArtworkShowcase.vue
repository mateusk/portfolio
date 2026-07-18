<script setup lang="ts">
interface ArtworkImage {
  image: string
  alt?: string
}

interface Artwork {
  title: string
  description: string
  medium?: string
  year?: string
  images: ArtworkImage[]
}

defineProps<{
  artwork: Artwork
}>()
</script>

<template>
  <section class="artwork-showcase">
    <div class="artwork-showcase__intro">
      <h2>{{ artwork.title }}</h2>
      <p class="artwork-showcase__description">{{ artwork.description }}</p>
      <dl v-if="artwork.medium || artwork.year" class="artwork-showcase__meta">
        <template v-if="artwork.medium">
          <dt class="label">Medium</dt>
          <dd>{{ artwork.medium }}</dd>
        </template>
        <template v-if="artwork.year">
          <dt class="label">Year</dt>
          <dd>{{ artwork.year }}</dd>
        </template>
      </dl>
    </div>

    <div v-if="artwork.images.length" class="artwork-showcase__gallery">
      <NuxtImg
        v-for="(item, index) in artwork.images"
        :key="index"
        :src="item.image"
        :alt="item.alt ?? ''"
      />
    </div>
  </section>
</template>

<style scoped>
.artwork-showcase {
  padding: var(--page-gutter);
  padding-bottom: var(--space-xl);
}

.artwork-showcase__intro {
  max-width: 36rem;
  margin-bottom: var(--space-xl);
}

.artwork-showcase__intro h2 {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: var(--text-display);
  margin: 0 0 var(--space-md);
}

.artwork-showcase__description {
  color: var(--color-fg-muted);
}

.artwork-showcase__meta {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: var(--space-xs) var(--space-lg);
  margin-top: var(--space-md);
}

.artwork-showcase__meta dd {
  margin: 0;
  font-family: var(--font-serif);
}

.artwork-showcase__gallery {
  display: grid;
  gap: var(--space-md);
}

.artwork-showcase__gallery img {
  width: 100%;
  border-radius: 0.25rem;
}
</style>
