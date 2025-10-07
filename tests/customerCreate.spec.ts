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

    await page.getByText('Create Customer').click();
    await page.waitForTimeout(1000);

    await page.fill('.customer-create-form input[name="name"]', 'John Doe'); // Name field
    await page.fill('.customer-create-form input[name="accountNumber"]', '123456'); // Account Number field

   
    await page.fill('input[name="contactInfo.phoneNumber"]', '1234567890'); // Primary phone number


    await page.fill('input[name="address.street1"]', '123 Main St'); // Street Address
    // await page.waitForSelector('text=123 Main Street Queens, NY, USA', { state: 'visible' });
    // await page.getByText('123 Main Street Queens, NY, USA').click();
    await page.fill('input[name="address.city"]', 'Los Angeles'); // City
    await page.fill('input[name="address.region"]', 'New York'); // state

    await page.fill('input[name="address.zipCode"]', '10038'); // zipcode

    await page.locator('div').filter({ hasText: /^Select a timezone$/ }).nth(2).click();
    await page.getByText('Africa/Abidjan').click();
    await page.waitForTimeout(10000);


    // Optionally, verify the selection
    await page.getByText('America/Los Angeles').click();


  //  await page.locator('text=America/Los_Angeles').click();


    await page.getByRole('button', { name: 'Save Customer' }).click();
    await page.waitForTimeout(1000);



  });
});
