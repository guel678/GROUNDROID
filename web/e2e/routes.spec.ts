import { expect, test } from '@playwright/test'

const routes = [
  ['/', 'Field Dashboard'], ['/field-data', 'Field Data & Configuration'], ['/sampling-planner', 'Data-Driven Sampling Planner'],
  ['/rover-control', 'Rover Mission Control'], ['/soil-maps', 'Soil Condition Maps'], ['/evaluation', 'System Performance Evaluation'],
] as const

for (const [path, title] of routes) {
  test(`${title} renders without page overflow`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()
    if (path === '/soil-maps' || path === '/evaluation') await expect(page.locator('.js-plotly-plot')).toBeVisible({ timeout: 20_000 })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(overflow).toBe(false)
  })
}

test('mobile navigation reaches every workflow', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile-only navigation check')
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('link', { name: 'Soil Maps' }).click()
  await expect(page).toHaveURL(/soil-maps/)
  await expect(page.getByRole('heading', { level: 1, name: 'Soil Condition Maps' })).toBeVisible()
})

test('keyboard focus is visible on primary navigation', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop sidebar check')
  await page.goto('/')
  await page.keyboard.press('Tab')
  const focused = page.locator(':focus')
  await expect(focused).toBeVisible()
  expect(await focused.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none')
})
