import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?');

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}

test('should append new items to the bottom of the list', async ({ page }) => {
  // Create 3 items.
  await createDefaultTodos(page);

  // create a todo count locator
  const todoCount = page.getByTestId('todo-count')

  // Check test using different methods.
  await expect(page.getByText('3 items left')).toBeVisible();
  await expect(todoCount).toHaveText('3 items left');
  await expect(todoCount).toContainText('3');
  await expect(todoCount).toHaveText(/3/);

  // Check all items in one call.
  await expect(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS);
  await checkNumberOfTodosInLocalStorage(page, 3);
});

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['react-todos']).length === e;
  }, expected);
}