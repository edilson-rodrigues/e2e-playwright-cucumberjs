import { Given } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { page } from './world';

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

Given('Creating 3 new items', async function () {
  // Create 3 items.
  const newTodo = page.getByPlaceholder('What needs to be done?');

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press('Enter', {
      delay: 3000,
    });
  }

  // create a todo count locator
  const todoCount = page.getByTestId('todo-count')

  // Check test using different methods.
  await expect(page.getByText('3 items left')).toBeVisible();
  await expect(todoCount).toHaveText('3 items left');
  await expect(todoCount).toContainText('3');
  await expect(todoCount).toHaveText(/3/);

  // Check all items in one call.
  await expect(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS);
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
});
