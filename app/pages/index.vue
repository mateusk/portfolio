<script setup lang="ts">
const { data: project } = await useAsyncData('featured-project', () =>
  queryCollection('projects').order('order', 'ASC').first(),
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'No projects found', fatal: true })
}

const { next } = await useNextProject(project.value.order)
</script>

<template>
  <div>
    <BioHero />
    <ProjectCaseStudy
      v-if="project"
      :project="project"
      :next-project-title="next?.title"
      :next-project-slug="next?.slug"
    />
  </div>
</template>
