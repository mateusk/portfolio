import { expect, test } from '@nuxt/test-utils/playwright'

test('a single small wheel tick at the boundary does not navigate', async ({ page, goto }) => {
  await goto('/projects/josquin-des-prez', { waitUntil: 'hydration' })
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.waitForTimeout(150)

  // Well under the 400px BOUNDARY_TRIGGER_PX threshold.
  await page.mouse.wheel(0, 50)
  await page.waitForTimeout(400)

  await expect(page).toHaveURL(/\/projects\/josquin-des-prez$/)
})

test('continued scrolling past the threshold does navigate', async ({ page, goto }) => {
  await goto('/projects/josquin-des-prez', { waitUntil: 'hydration' })
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.waitForTimeout(150)

  // Three ticks close together (well under the 600ms idle-reset window)
  // accumulating past 400px.
  await page.mouse.wheel(0, 200)
  await page.waitForTimeout(100)
  await page.mouse.wheel(0, 200)
  await page.waitForTimeout(100)
  await page.mouse.wheel(0, 200)

  await page.waitForURL('**/projects/your-story-matters', { timeout: 5000 })
})
