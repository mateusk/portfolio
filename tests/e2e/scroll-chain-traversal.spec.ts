import { expect, test } from '@nuxt/test-utils/playwright'

// Derived from content/projects/*.md and content/artworks/*.md `order` fields.
const CHAIN = [
  '/',
  '/projects/josquin-des-prez',
  '/projects/your-story-matters',
  '/projects/your-data-mirror',
  '/projects/inspark',
  '/projects/victoria-pavillion',
  '/projects/game-of-civilizations',
  '/projects/alley-of-words',
  '/projects/david-bowie-is',
  '/artworks/small-fragments-of-a-suspension-machine',
  '/artworks/medium',
  '/artworks/gude',
  '/artworks/the-fugitive-dillema',
  '/artworks/monomith',
  '/contact',
]

test('scroll-chain traverses index -> all projects -> all artworks -> contact', async ({ page, goto }) => {
  test.setTimeout(60_000)
  await goto('/', { waitUntil: 'hydration' })

  for (let i = 0; i < CHAIN.length - 1; i++) {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(150)
    // Safely past the 400px boundary trigger threshold in one tick.
    await page.mouse.wheel(0, 450)
    await page.waitForURL(`**${CHAIN[i + 1]}`, { timeout: 5000 })
    // Let the page transition and the navigation lock settle before the next hop.
    await page.waitForTimeout(1000)
  }

  await expect(page).toHaveURL(/\/contact$/)
})
