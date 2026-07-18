<script setup lang="ts">
withDefaults(defineProps<{
  githubUrl?: string
  linkedinUrl?: string
}>(), {
  githubUrl: '#',
  linkedinUrl: '#',
})
</script>

<template>
  <div class="social-links">
    <a :href="githubUrl" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
      <IconsIconGithub />
    </a>
    <a :href="linkedinUrl" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
      <IconsIconLinkedin />
    </a>
  </div>
</template>

<style scoped>
.social-links {
  display: flex;
  gap: var(--space-sm);
}

.social-links a {
  display: flex;
  color: inherit;
  width: 20px;
  height: 20px;
}
</style>
