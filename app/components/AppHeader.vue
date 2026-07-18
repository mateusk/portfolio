<script setup lang="ts">
const { isOpen, toggle } = useNavOverlay()
</script>

<template>
  <header class="app-header" :class="{ 'app-header--inverted': isOpen }">
    <NuxtLink to="/" class="app-header__logo" aria-label="Home">
      <IconsIconLogo />
    </NuxtLink>
    <button
      type="button"
      class="app-header__toggle"
      :class="{ 'is-open': isOpen }"
      :aria-label="isOpen ? 'Close menu' : 'Open menu'"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span class="app-header__bar" />
      <span class="app-header__bar" />
    </button>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-header);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--page-gutter);
  color: var(--color-fg);
  transition: color 0.2s ease;
}

.app-header--inverted {
  color: var(--color-inverted-fg);
}

.app-header__logo {
  width: 28px;
  height: 25px;
  color: inherit;
}

.app-header__toggle {
  position: relative;
  width: 21px;
  height: 21px;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
}

.app-header__bar {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transition: top 0.25s ease, transform 0.25s ease;
}

.app-header__bar:first-child {
  top: 6px;
}

.app-header__bar:last-child {
  top: 14px;
}

.app-header__toggle.is-open .app-header__bar:first-child {
  top: 10px;
  transform: rotate(45deg);
}

.app-header__toggle.is-open .app-header__bar:last-child {
  top: 10px;
  transform: rotate(-45deg);
}
</style>
