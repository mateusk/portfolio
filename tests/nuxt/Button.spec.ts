import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Button from '~/components/Button.vue'

describe('Button', () => {
  it('renders as a <button> when no href is given', async () => {
    const wrapper = await mountSuspended(Button, {
      slots: { default: 'Click me' },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('renders as an external <a> by default when href is given', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { href: 'https://example.com' },
      slots: { default: 'Visit' },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('target')).toBe('_blank')
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
  })

  it('omits target/rel when external is false', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { href: '/internal', external: false },
      slots: { default: 'Go' },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('target')).toBeUndefined()
    expect(wrapper.attributes('rel')).toBeUndefined()
  })
})
