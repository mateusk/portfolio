import { expect, test } from '@nuxt/test-utils/playwright'

test('opening the nav overlay and navigating to a project closes it', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })

  const toggle = page.locator('.app-header__toggle')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')

  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')

  await page.getByRole('link', { name: 'Josquin des Prez' }).click()

  await page.waitForURL('**/projects/josquin-des-prez')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
})
