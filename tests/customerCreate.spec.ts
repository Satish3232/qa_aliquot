import { test, expect } from '../setup';
import { LoginPage } from '../pages/loginPage';

// Helper function to generate random strings and numbers
const generateRandomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generateRandomPhoneNumber = () => {
  // const areaCode = Math.floor(Math.random() * 900) + 100;  // Random area code between 100 and 999
  // const prefix = Math.floor(Math.random() * 900) + 100; // Random prefix between 100 and 999
  // const lineNumber = Math.floor(Math.random() * 9000) + 1000; // Random line number between 1000 and 9999
  return Math.floor(1000000000 + Math.random() * 9000000000); // Random 9-digit number
};

const randomPhone = generateRandomPhoneNumber(); // This is a number

const generateRandomZipCode = () => {
  return Math.floor(Math.random() * 90000) + 10000; // Random 5-digit zip code
};

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

    // Test Step 1: Hover on the Customers button and select Customers List option, wait for the page to load and take screenshot.
    const customersButton = page.locator('button:has-text("Customers")').first();
    await customersButton.hover();
    await page.waitForTimeout(1000);
    const customersListOption = page.locator('.aps-row.aps-click:has-text("Customer List")').first();
    await customersListOption.click();
    await page.waitForLoadState('networkidle');

    await page.getByText('Create Customer').click();
    await page.waitForTimeout(1000);

    // Generating random customer data
    const randomName = `John Doe ${generateRandomString(3)}`; // Random name
    const randomAccountNumber = `ACC-${Math.floor(Math.random() * 900000) + 100000}`; // Random account number
    const randomPhone = generateRandomPhoneNumber(); // Random phone number
    const randomStreet = `${Math.floor(Math.random() * 1000)} Main St`; // Random street address
    const randomCity = 'Los Angeles'; // You can change this if needed
    const randomRegion = 'New York'; // You can change this if needed
    const randomZip = generateRandomZipCode(); // Random zip code

    // Filling out the form with random values
    await page.fill('.customer-create-form input[name="name"]', randomName); // Name field
    await page.fill('.customer-create-form input[name="accountNumber"]', randomAccountNumber); // Account Number field
    await page.fill('input[name="contactInfo.phoneNumber"]', randomPhone.toString()); // Convert the number to string
    await page.fill('input[name="address.street1"]', randomStreet); // Street Address
    await page.fill('input[name="address.city"]', randomCity); // City
    await page.fill('input[name="address.region"]', randomRegion); // State
    await page.fill('input[name="address.zipCode"]', randomZip.toString()); // Convert number to string


    // Selecting timezone
    await page.locator('div').filter({ hasText: /^Select a timezone$/ }).nth(2).click();
    await page.locator('#frmCreateCustomer').getByText('Select a timezone').click();
    await page.getByText('Africa/Abidjan').click();
    await page.waitForTimeout(500);

    // Saving the customer
    await page.getByRole('button', { name: 'Save Customer' }).click();
    await page.waitForTimeout(1000);

    console.log('✅ Customer created with random data');

    






  });
});
