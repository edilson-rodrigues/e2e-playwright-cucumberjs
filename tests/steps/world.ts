import { AfterAll, Before, setDefaultTimeout } from '@cucumber/cucumber';
import * as playwright from '@playwright/test';

setDefaultTimeout(60 * 1000);

let page: playwright.Page;
let browser: playwright.Browser;
let context: playwright.BrowserContext;

Before(async () => {
  try {
    browser = await playwright.chromium.launch({ headless: false });

    context = await browser.newContext({
      baseURL: "https://demo.playwright.dev",
      recordVideo: {
        dir: 'videos/',
        size: { width: 640, height: 480 },
      }
    });

    page = await context.newPage();

  } catch (error) {
    console.error('chrome navigation to site failed', error);
  }
})

Before({ tags: '@todomvc' }, async () => {
  await page.goto('/todomvc');
})

AfterAll(async () => {
  await context?.close();
  await browser?.close();
});

export { page, browser }