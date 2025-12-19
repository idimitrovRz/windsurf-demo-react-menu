import { expect, test, type Page } from '@playwright/test'

test('casino menu critical flow', async ({ page }: { page: Page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Open Menu' }).click()

  await expect(page.getByRole('dialog', { name: 'Casino menu' })).toBeVisible()

  await page.getByRole('tab', { name: 'Game Settings' }).click()
  await page.getByRole('switch', { name: 'Sound' }).click()

  await page.getByRole('tab', { name: 'Autoplay Settings' }).click()
  await expect(page.getByText('STOP AUTOPLAY')).toBeVisible()
  await page.getByRole('slider', { name: 'If balance decreases by' }).focus()
  await page.keyboard.press('ArrowRight')

  await page.getByRole('tab', { name: 'History' }).click()
  await page.getByRole('button', { name: 'All Games' }).click()

  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Casino menu' })).toBeHidden()
})
