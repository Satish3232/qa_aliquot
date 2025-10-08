import { test, expect } from '../setup';
import { LoginPage } from '../pages/loginPage';

  test.describe('Aliquot Login and Clone Customer Flow', () => {
  test('should login, navigate to customer list, clone customer, and fill form', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1: Perform Login
    await loginPage.navigate();
    await loginPage.login('qa_automation@aquaphoenixsci.com', '12345678');
    await expect(page).toHaveURL(/.*dashboard/);
    console.log('✅ Logged in successfully');

    // Step 2: Hover on the Customers button and click on "Customer List"
    const customersButton = page.locator('button:has-text("Customers")').first();
    await customersButton.hover();
    await page.waitForTimeout(1000);
    const customersListOption = page.locator('.aps-row.aps-click:has-text("Customer List")').first();
    await customersListOption.click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Clicked on Customer List');

    // Step 3: Wait for the Clone Customer button and click it
    const cloneCustomerButton = page.locator('button:has-text("Clone Customer")');
    await cloneCustomerButton.waitFor({ state: 'visible', timeout: 5000 });
    await cloneCustomerButton.click();
    console.log('✅ Clone Customer button clicked');
   
    // Step 4: Select Client Frist
    
    await page.locator('.form-header-label-field', { hasText: 'Source' });
    await page.locator('div').filter({ hasText: /^Select Client$/ }).nth(4).click();
    await page.getByRole('searchbox', { name: 'Search for clients...' }).click();
    await page.getByRole('searchbox', { name: 'Search for clients...' }).fill('Aquaphoenix');
    await page.getByRole('cell', { name: 'Aquaphoenix_automation' }).click();
    console.log('✅ Select Client');

    // Step 5: Select 
    await page.getByText('Select Customer').click();
    await page.getByRole('searchbox', { name: 'Search for customers...' }).nth(1).click();
    await page.getByRole('searchbox', { name: 'Search for customers...' }).nth(1).fill('Aqua');
    await page.getByRole('cell', { name: 'Aqua_auto_client_1' }).nth(1).click();
    
  

    //Step 6
    await page.getByText('Select Facility').click();
    await page.getByRole('searchbox', { name: 'Search for facilities...' }).click();
    await page.getByRole('searchbox', { name: 'Search for facilities...' }).fill('Cust');
    await page.getByRole('cell', { name: 'Customer Aps' }).click();

    // Step 7
    await page.getByText('DestinationClientCustomer\'s').click();
    await page.locator('#frmCloneCustomer').getByText('Select Client').click();
    await page.getByRole('searchbox', { name: 'Search for clients...' }).click();
    await page.getByRole('searchbox', { name: 'Search for clients...' }).fill('Aqua');
    await page.getByRole('cell', { name: 'Aquaphoenix_automation' }).click();

  //Step 8
  await page.locator('div').filter({ hasText: /^Select Customer$/ }).first().click();
  await page.getByRole('searchbox', { name: 'Search for customers...' }).nth(1).click();
  await page.getByRole('searchbox', { name: 'Search for customers...' }).nth(1).fill('Aqua');
  await page.getByRole('cell', { name: 'Aqua_auto_client_1' }).nth(1).click();

  //Step 9 
  await page.locator('div').filter({ hasText: /^Select Facility$/ }).first().click();
  await page.getByRole('searchbox', { name: 'Search for facilities...' }).click();
  await page.getByRole('searchbox', { name: 'Search for facilities...' }).fill('custo');
  await page.locator('.sc-iRLAEC.cZpOlZ > .sc-bnGbuY > tr > td > .sc-gohMHu.esKTFX.table-loading-panel').click();

  //Step 10
  await page.getByRole('textbox').fill('Testing');


});
    
});

