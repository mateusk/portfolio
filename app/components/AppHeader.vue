<script setup lang="ts">
const { isOpen, toggle } = useNavOverlay();
</script>

<template>
  <header
    class="app-header"
    :class="{ 'app-header--inverted': isOpen }"
  >
    <NuxtLink
      to="/"
      class="app-header__logo"
      aria-label="Home"
    >
      <Logo :color="isOpen ? 'dark' : 'light'" />
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
    <div class="backdrop">
      <div class="backdrop__layer" />
      <div class="backdrop__layer" />
      <div class="backdrop__layer" />
      <div class="backdrop__layer" />
    </div>
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

/*
 * A single blurred layer faded out with a transparency mask can't produce a
 * true "100% blur -> 0% blur" transition — the blur radius stays constant,
 * only its opacity changes, so what's underneath just becomes gradually more
 * visible *through* a fixed blur. A real progressive blur needs several
 * layers at increasing blur strengths, each fading out at a different point:
 * near the top they compound (strong blur), and toward the bottom they drop
 * away one at a time down to fully sharp.
 */
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8rem;
  z-index: -1;
  pointer-events: none;
}

.backdrop__layer {
  position: absolute;
  inset: 0;
}

.backdrop__layer:nth-child(1) {
  backdrop-filter: blur(20px);
  mask-image: linear-gradient(to bottom, black 0%, transparent 30%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 30%);
}

.backdrop__layer:nth-child(2) {
  backdrop-filter: blur(14px);
  mask-image: linear-gradient(to bottom, black 0%, black 15%, transparent 55%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 15%, transparent 55%);
}

.backdrop__layer:nth-child(3) {
  backdrop-filter: blur(8px);
  mask-image: linear-gradient(to bottom, black 0%, black 35%, transparent 75%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 35%, transparent 75%);
}

.backdrop__layer:nth-child(4) {
  backdrop-filter: blur(4px);
  mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 100%);
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
  transition:
    top 0.25s ease,
    transform 0.25s ease;
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
