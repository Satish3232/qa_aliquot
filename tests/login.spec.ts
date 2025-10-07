import { test, expect } from '../setup';
import { LoginPage } from '../pages/loginPage';


test.describe('Aliquot Login Testcase for Login', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 👇 Maximize window
    await page.setViewportSize({ width: 1600, height: 900 });

    await loginPage.navigate();
    await loginPage.login('qa_automation@aquaphoenixsci.com', '12345678');

  });


});
