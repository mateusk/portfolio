<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: artwork } = await useAsyncData(`artwork-${slug}`, () =>
  queryCollection('artworks').where('slug', '=', slug).first(),
)

if (!artwork.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artwork not found', fatal: true })
}
</script>

<template>
  <div>
    <BioHero />
    <ArtworkShowcase v-if="artwork" :artwork="artwork" />
  </div>
</template>
