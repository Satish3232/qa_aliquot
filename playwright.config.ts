import { defineConfig } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  use: {
    baseURL: 'https://qa.aliquot.live/',
    headless: false,
    screenshot: 'off',     // disable auto screenshots
    video: 'on',           // record all runs (we’ll keep only on pass)
    trace: 'on',           // collect trace, attach only on pass
  },
});