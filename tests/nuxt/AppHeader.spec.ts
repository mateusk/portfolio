import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppHeader from '~/components/AppHeader.vue'
import { useNavOverlay } from '~/composables/useNavOverlay'

afterEach(() => {
  // isOpen is a useState singleton shared across `it` blocks in this file.
  useNavOverlay().close()
})

describe('AppHeader', () => {
  it('renders the toggle closed by default', async () => {
    const wrapper = await mountSuspended(AppHeader, { route: '/' })
    const toggle = wrapper.get('.app-header__toggle')

    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(toggle.attributes('aria-label')).toBe('Open menu')
    expect(toggle.classes()).not.toContain('is-open')
  })

  it('opens the nav overlay state when the toggle is clicked', async () => {
    const wrapper = await mountSuspended(AppHeader, { route: '/' })
    const toggle = wrapper.get('.app-header__toggle')

    await toggle.trigger('click')

    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(toggle.attributes('aria-label')).toBe('Close menu')
    expect(toggle.classes()).toContain('is-open')
  })
})
