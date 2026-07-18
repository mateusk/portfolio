<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: project } = await useAsyncData(`project-${slug}`, () =>
  queryCollection('projects').where('slug', '=', slug).first(),
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const { next } = await useNextInChain(`/projects/${slug}`)
</script>

<template>
  <div>
    <ProjectCaseStudy
      v-if="project"
      :project="project"
      :next-title="next?.title"
      :next-path="next?.path"
    />
  </div>
</template>
