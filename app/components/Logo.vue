<script lang="ts" setup>
const props = defineProps<{
  // Either 'light' or 'dark', defaults to 'light'
  color?: "light" | "dark";
}>();

const logoSrc = computed(() => {
  return props.color === "dark"
    ? "/images/logo/logo-dark.svg"
    : "/images/logo/logo-light.svg";
});
</script>

<template>
  <NuxtImg
    :src="logoSrc"
    alt="Logo"
    width="100"
    height="100"
    priority
    class="logo"
  />
</template>

<style scoped>
.logo {
  display: block;
  width: 100%;
  height: auto;
}
</style>
