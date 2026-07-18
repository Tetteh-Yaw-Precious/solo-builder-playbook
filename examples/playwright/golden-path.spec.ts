/**
 * Golden-path E2E test — the highest-ROI test a solo builder can write.
 *
 * One test drives a complete "money flow" end to end, exactly as a user
 * experiences it: UI -> form logic -> API -> persistence -> re-render.
 * It asserts on what the USER SEES (the rendered value), not on internal
 * state, and it proves the result survives a reload.
 *
 * Adapt the selectors and flow to your app. Keep the SHAPE:
 *   arrive -> act like a user -> assert rendered output -> persist -> reload -> re-assert
 *
 * Run it:
 *   npx playwright test --headed            # watch it drive a real browser
 *   npx playwright test                     # fast, headless
 *   npx playwright test --reporter=line     # what CI runs on every push
 */
import { test, expect } from '@playwright/test'

test('a user can create an invoice and see the correct total', async ({ page }) => {
  // 1. Arrive at the real running app (baseURL set in playwright.config)
  await page.goto('/')

  // 2. Do exactly what a user does — create state through the UI, not a seed
  await page.getByRole('button', { name: 'New invoice' }).click()
  await page.getByLabel('Client').fill('Ada Lovelace')
  await page.getByRole('button', { name: 'Add line item' }).click()
  await page.getByLabel('Description').fill('Consultation')
  await page.getByLabel('Amount').fill('150')

  // 3. Assert on what the USER SEES — the rendered total, the number they'd be charged
  await expect(page.getByTestId('invoice-total')).toHaveText('$150.00')

  // 4. Cross the real boundaries: submit -> API -> persist -> confirm
  await page.getByRole('button', { name: 'Save invoice' }).click()
  await expect(page.getByText('Invoice saved')).toBeVisible()

  // 5. Prove persistence survives a reload — catches the classic "worked until refresh" bug
  await page.reload()
  await expect(page.getByTestId('invoice-total')).toHaveText('$150.00')
})
