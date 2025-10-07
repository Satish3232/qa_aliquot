import { Page, expect } from '@playwright/test';

export class LoginPage {
  assertOnDashboard() {
    throw new Error('Method not implemented.');
  }
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="email"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button:has-text("Login to Account")');
    await this.page.waitForLoadState('networkidle');
  }

async clickSearchIcon() {
  console.log('🔍 Trying to click search icon...');

  const searchIcon = this.page.locator('div.aps-cell div.header-icon.aps-click');

  // Verify element count and visibility
  const count = await searchIcon.count();
  console.log(`Found ${count} search icon(s)`);

  await searchIcon.first().waitFor({ state: 'visible', timeout: 5000 });
  await searchIcon.first().click({ force: true });

  console.log('✅ Search icon clicked');
  await this.page.waitForLoadState('networkidle');
}

  async enterSystemId(systemId: string) {
    const searchInput = this.page.locator('input[name="searchInput"]');
    await searchInput.waitFor({ state: 'visible', timeout: 5000 });
    await searchInput.fill(systemId);
    console.log(`✅ Entered system ID: ${systemId}`);
  }

  async selectSearchResult(systemId: string) {
    const resultRow = this.page.locator(`tr:has-text("${systemId}"), .table-row:has-text("${systemId}")`).first();
    await resultRow.waitFor({ state: 'visible', timeout: 5000 });
    await resultRow.click();
    console.log(`✅ Clicked result for system ID: ${systemId}`);

  // async selectTimezone(timezone: string) {
  // await this.page.locator('.aps-select').click();
  // const option = this.page.locator(`text=${timezone}`);
  // await option.scrollIntoViewIfNeeded();
  // await option.waitFor({ state: 'visible' });
  // await option.click();
  // await expect(this.page.locator('.aps-select')).toContainText(timezone);
}
  }

