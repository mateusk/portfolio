<script setup lang="ts">
interface GalleryItem {
  device: 'desktop' | 'tablet' | 'phone'
  image: string
  alt?: string
}

interface Project {
  title: string
  tagline: string
  description: string
  client?: string
  developedAt?: string
  designCredits?: string
  tags: string[]
  liveUrl?: string
  heroImage: string
  gallery: GalleryItem[]
}

const props = defineProps<{
  project: Project
  nextProjectTitle?: string
  nextProjectSlug?: string
}>()

const tickCount = computed(() => 2 + props.project.gallery.length)
</script>

<template>
  <div class="project-case-study">
    <SpineTimeline :label="project.title" :ticks="tickCount" />

    <ProjectHeroSlide
      :hero-image="project.heroImage"
      :tagline="project.tagline"
      :description="project.description"
      :tags="project.tags"
      :live-url="project.liveUrl"
    />

    <section
      v-for="(item, index) in project.gallery"
      :key="index"
      class="project-case-study__gallery-slide"
    >
      <DeviceMockup :device="item.device" :image="item.image" :alt="item.alt" />
    </section>

    <ProjectCreditsSlide
      :client="project.client"
      :developed-at="project.developedAt"
      :design-credits="project.designCredits"
      :next-project-title="nextProjectTitle"
      :next-project-slug="nextProjectSlug"
    />
  </div>
</template>

<style scoped>
.project-case-study {
  position: relative;
}

.project-case-study__gallery-slide {
  min-height: var(--viewport-section);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--page-gutter);
}
</style>
