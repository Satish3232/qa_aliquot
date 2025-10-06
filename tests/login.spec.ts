import { test, expect } from '../setup';
import { LoginPage } from '../pages/loginPage';


test.describe('Aliquot Login Tests', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);


    await loginPage.navigate();
    await loginPage.login('qa_automation@aquaphoenixsci.com', '12345678');


    // assertion via page object method
    await loginPage.assertOnDashboard();


    // direct assertion (extra safety)
    await expect(page).toHaveURL(/.*dashboard/);
  });


  // Example negative case
  // test('should show error with invalid credentials', async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   await loginPage.navigate();
  //   await loginPage.login('invalid@user.com', 'wrongpass');
  //   await expect(page.locator('text=Invalid credentials')).toBeVisible();
  // });
});
