<script setup lang="ts">
const { data: page } = await useAsyncData("page-about", () =>
  queryCollection("pages").path("/about").first(),
);
</script>

<template>
  <section
    v-if="page"
    class="bio-hero"
  >
    <div class="headline">
      <h1>{{ page.headline }}</h1>
    </div>

    <div class="content">
      <ContentRenderer :value="page" />
    </div>

    <div class="footer">
      <p class="label bio-hero__projects-label">Projects</p>
      <SocialLinks class="bio-hero__socials" />
    </div>
  </section>
</template>

<style scoped>
.bio-hero {
  position: relative;
  min-height: var(--viewport-section);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  padding: var(--page-gutter);
  padding-top: calc(var(--page-gutter) * 3);
}

.headline {
  min-width: 0;
}

.headline h1 {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: var(--text-display);
  line-height: 1.3;
  margin: 0;
  max-width: 24rem;
  width: 100%;
  overflow-wrap: break-word;
}

.content {
  font-family: var(--font-serif);
  color: var(--color-fg-muted);
  max-width: 28rem;
  min-width: 0;
  justify-self: end;
}

.content :deep(p) {
  margin: 0 0 1em;
}

.footer {
  position: absolute;
  bottom: var(--page-gutter);
  left: var(--page-gutter);
  right: var(--page-gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bio-hero__socials {
  color: var(--color-fg);
}

@media (max-width: 900px) {
  .bio-hero {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
    min-height: auto;
    padding-top: calc(var(--page-gutter) * 3);
    padding-bottom: var(--space-xl);
  }

  .headline h1 {
    font-size: 2rem;
    max-width: none;
  }

  .content {
    justify-self: start;
    max-width: none;
  }

  .footer {
    position: static;
    margin-top: var(--space-lg);
  }
}
</style>
