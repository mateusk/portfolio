import { expect, test } from '@nuxt/test-utils/playwright'

test('an unknown project slug returns a 404', async ({ goto }) => {
  const response = await goto('/projects/not-a-real-slug', { waitUntil: 'hydration' })
  expect(response?.status()).toBe(404)
})
