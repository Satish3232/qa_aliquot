import { test as base } from '@playwright/test';

export const test = base.extend({
  // Automatically clear session after each test
  page: async ({ page, context }, use) => {
    await use(page);
    await context.clearCookies();
    await context.clearPermissions();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  },
});

export const expect = test.expect;
