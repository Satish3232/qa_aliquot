import { test, expect } from '../setup';
import { LoginPage } from '../pages/loginPage';


test.describe('Aliquot Login and Search Flow', () => {
  test('should login, search system, and open system details', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1: Perform Login
    await loginPage.navigate();
    await loginPage.login('qa_automation@aquaphoenixsci.com', '12345678');
    await expect(page).toHaveURL(/.*dashboard/);
    console.log('✅ Logged in successfully');

    // Step 2: Click on Search icon
    await loginPage.clickSearchIcon();

    // Step 3: Enter system ID in search input
    await loginPage.enterSystemId('74052');

    // Step 4: Click the matching search result
    await loginPage.selectSearchResult('74052');

    //Test Step 1: Hover on the Customers button and select Customers List option, wait for the page to load and take screenshot.
    const customersButton = page.locator('button:has-text("Customers")').first();
    await customersButton.hover();
    await page.waitForTimeout(1000);
    const customersListOption = page.locator('.aps-row.aps-click:has-text("Customer List")').first();
    await customersListOption.click();
    await page.waitForLoadState('networkidle');


    






    });
});
