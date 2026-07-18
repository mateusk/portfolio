import type { RouterConfig } from '@nuxt/schema'

// Scroll restoration on route change is handled manually by the scroll-chain
// logic in app/layouts/default.vue — disable Nuxt's default auto-scroll so it
// doesn't race with (and clobber) that.
export default <RouterConfig>{
  scrollBehavior: () => false,
}
