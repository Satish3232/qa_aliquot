import { chromium, firefox, webkit } from '@playwright/test';

(async () => {
  const chromiumBrowser = await chromium.launch();
  console.log('Chromium version:', chromiumBrowser.version());
  await chromiumBrowser.close();

  const firefoxBrowser = await firefox.launch();
  console.log('Firefox version:', firefoxBrowser.version());
  await firefoxBrowser.close();

  const webkitBrowser = await webkit.launch();
  console.log('WebKit version:', webkitBrowser.version());
  await webkitBrowser.close();
})();
