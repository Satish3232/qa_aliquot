import { test as base } from '@playwright/test';


export const test = base.extend({});


test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'passed') {
    // Screenshot
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('screenshot-on-pass', {
      body: screenshot,
      contentType: 'image/png',
    });


    // Video
    const videoPath = await page.video()?.path();
    if (videoPath) {
      await testInfo.attach('video-on-pass', {
        path: videoPath,
        contentType: 'video/webm',
      });
    }


    // Trace
    await testInfo.attach('trace-on-pass', {
      path: testInfo.outputPath('trace.zip'),
      contentType: 'application/zip',
    });
  } else {
    // ❌If failed → discard video to save space
    await page.video()?.delete();
  }
});


export { expect } from '@playwright/test';