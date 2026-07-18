<script setup lang="ts">
const { isOpen, close } = useNavOverlay()

const { data: projects } = await useAsyncData('nav-projects', () =>
  queryCollection('projects').order('order', 'ASC').all(),
)

const { data: artworks } = await useAsyncData('nav-artworks', () =>
  queryCollection('artworks').order('order', 'ASC').all(),
)

const STAGGER_MS = 40

function itemDelay(index: number) {
  return { transitionDelay: `${index * STAGGER_MS}ms` }
}
</script>

<template>
  <Transition name="nav-overlay">
    <div
      v-if="isOpen"
      class="nav-overlay"
    >
      <div class="nav-overlay__columns">
        <TransitionGroup tag="div" name="nav-item" appear class="nav-overlay__column">
          <p key="identity-label" class="label nav-overlay__identity" :style="itemDelay(0)">
            Mateus Knelsen
          </p>
          <NuxtLink
            key="about"
            to="/about"
            class="nav-overlay__link nav-overlay__link--large"
            :style="itemDelay(1)"
            @click="close"
          >
            About
          </NuxtLink>
          <NuxtLink
            key="contact"
            to="/contact"
            class="nav-overlay__link nav-overlay__link--large"
            :style="itemDelay(2)"
            @click="close"
          >
            Contact
          </NuxtLink>
        </TransitionGroup>

        <TransitionGroup tag="div" name="nav-item" appear class="nav-overlay__column">
          <p key="projects-label" class="label nav-overlay__heading" :style="itemDelay(0)">
            Projects
          </p>
          <NuxtLink
            v-for="(project, index) in projects"
            :key="project.slug"
            :to="`/projects/${project.slug}`"
            class="nav-overlay__link"
            :style="itemDelay(index + 1)"
            @click="close"
          >
            {{ project.title }}
          </NuxtLink>
        </TransitionGroup>

        <TransitionGroup tag="div" name="nav-item" appear class="nav-overlay__column">
          <p key="artworks-label" class="label nav-overlay__heading" :style="itemDelay(0)">
            Artworks
          </p>
          <NuxtLink
            v-for="(artwork, index) in artworks"
            :key="artwork.slug"
            :to="`/artworks/${artwork.slug}`"
            class="nav-overlay__link"
            :style="itemDelay(index + 1)"
            @click="close"
          >
            {{ artwork.title }}
          </NuxtLink>
        </TransitionGroup>
      </div>

      <div class="nav-overlay__socials">
        <SocialLinks />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.nav-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-nav-overlay);
  background: var(--color-inverted-bg);
  color: var(--color-inverted-fg);
  padding: var(--page-gutter);
  overflow-y: auto;
}

.nav-overlay__columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-xl);
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding-top: 8rem;
}

.nav-overlay__column {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.nav-overlay__identity {
  color: var(--color-inverted-fg-muted);
  margin-bottom: var(--space-sm);
}

.nav-overlay__heading {
  color: var(--color-inverted-fg-muted);
  margin-bottom: var(--space-sm);
}

.nav-overlay__link {
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
  font-size: 1.1rem;
  padding: 0.35rem 0;
}

.nav-overlay__link--large {
  font-family: var(--font-serif);
  text-transform: none;
  letter-spacing: normal;
  font-size: var(--text-heading);
}

.nav-overlay__socials {
  position: absolute;
  bottom: var(--page-gutter);
  right: var(--page-gutter);
}

.nav-overlay-enter-active,
.nav-overlay-leave-active {
  transition: opacity 0.25s ease;
}

.nav-overlay-enter-from,
.nav-overlay-leave-to {
  opacity: 0;
}

.nav-item-enter-active,
.nav-item-leave-active {
  transition: opacity 0.5s ease, filter 0.5s ease;
}

.nav-item-enter-from,
.nav-item-leave-to {
  opacity: 0;
  filter: blur(10px);
}

@media (max-width: 720px) {
  .nav-overlay__columns {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
    padding-top: 5rem;
  }
}
</style>
