import { Page } from '@playwright/test';


export class LoginPage {
  private readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }


  // Navigate using baseURL from playwright.config.ts
  async navigate() {
    await this.page.goto('/'); // Playwright automatically prefixes baseURL
  }


  // Perform login
  async login(username: string, password: string) {
    await this.page.fill('input[name="email"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button:has-text("Login to Account")');
  }


  // Optional: add reusable assertions
  async assertOnDashboard() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForURL(/.*dashboard/);
  }
}
