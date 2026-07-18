<script setup lang="ts">
const { data: page } = await useAsyncData('page-about-full', () =>
  queryCollection('pages').path('/about').first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <div class="static-page">
    <h1>{{ page?.headline ?? page?.title }}</h1>
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<style scoped>
.static-page {
  max-width: 36rem;
  margin: 0 auto;
  padding: var(--page-gutter);
  padding-top: calc(var(--page-gutter) * 3);
  padding-bottom: var(--space-xl);
}

.static-page h1 {
  font-family: var(--font-serif);
  font-weight: 400;
  font-style: italic;
  font-size: var(--text-display);
  line-height: 1.3;
}

.static-page :deep(p) {
  color: var(--color-fg-muted);
}
</style>
