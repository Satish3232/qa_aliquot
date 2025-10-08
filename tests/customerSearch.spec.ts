import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';


test('Aliquot Login and Customer Selection Flow', async ({ page }) => {

  // ----------------------------------------------------------------
  // STEP 1: Navigate to the Aliquot QA site
  // ----------------------------------------------------------------
  await page.goto('https://qa.aliquot.live/');
  console.log('✅ Navigated to Aliquot QA URL');

  // ----------------------------------------------------------------
  // STEP 2: Enter login credentials
  // ----------------------------------------------------------------
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('qa_automation@aquaphoenixsci.com');
  console.log('✅ Entered username');

  await page.getByRole('textbox', { name: '*********' }).click();
  await page.getByRole('textbox', { name: '*********' }).fill('12345678');
  console.log('✅ Entered password');

  // ----------------------------------------------------------------
  // STEP 3: Click "Login to Account" button
  // ----------------------------------------------------------------
  await page.getByRole('button', { name: 'Login to Account' }).click();
  console.log('✅ Clicked on Login button');

  // ----------------------------------------------------------------
  // STEP 4: Navigate to "Customers" section from main menu
  // ----------------------------------------------------------------
  await page.getByRole('button', { name: 'Customers' }).click();
  console.log('✅ Opened Customers section');

  // ----------------------------------------------------------------
  // STEP 5: Click on "Customer List" option
  // ----------------------------------------------------------------
  await page
    .locator('div')
    .filter({ hasText: /^Customer List customers by client\.$/ })
    .nth(1)
    .click();
  console.log('✅ Clicked on Customer List');

  // ----------------------------------------------------------------
  // STEP 6: Search for customer "Aqua_auto"
  // ----------------------------------------------------------------
  await page.getByRole('searchbox', { name: 'Search for customers...' }).click();
  await page.getByRole('searchbox', { name: 'Search for customers...' }).fill('Aqua_auto');
  console.log('✅ Searched for Aqua_auto customer');

  // ----------------------------------------------------------------
  // STEP 7: Select "Aqua_auto_client_1" from results
  // ----------------------------------------------------------------
  await page.getByRole('cell', { name: 'Aqua_auto_client_1' }).click();
  console.log('✅ Selected Aqua_auto_client_1');

  // ----------------------------------------------------------------
  // STEP 8: Navigate back to dashboard
  // ----------------------------------------------------------------
  await page.goto('https://qa.aliquot.live/dashboard');
  console.log('✅ Navigated back to Dashboard');

  // ----------------------------------------------------------------
  // STEP 9: Open Customers again from Dashboard
  // ----------------------------------------------------------------
  await page.locator('.sc-iMPxVN').click(); // Open sidebar menu
  await page.getByRole('button', { name: 'Customers' }).click();
  console.log('✅ Opened Customers section again');

  // ----------------------------------------------------------------
  // STEP 10: Search for "Aqua_auto" again
  // ----------------------------------------------------------------
  await page.getByRole('searchbox', { name: 'Search for customers...' }).click();
  await page.getByRole('searchbox', { name: 'Search for customers...' }).fill('Aqua_auto');
  console.log('✅ Re-searched for Aqua_auto');

  // ----------------------------------------------------------------
  // STEP 11: Click the result and select the customer again
  // ----------------------------------------------------------------
  await page.locator('.sc-hGZxvd').click();
  await page.getByRole('cell', { name: 'Aqua_auto_client_1' }).click();
  console.log('✅ Selected Aqua_auto_client_1 again');

  // ----------------------------------------------------------------
  // STEP 12: Final assertion (optional)
  // ----------------------------------------------------------------
  // Example: Check if customer details page is visible
  // await expect(page.getByText('Customer Details')).toBeVisible();
  console.log('🎉 Test completed successfully!');
});


