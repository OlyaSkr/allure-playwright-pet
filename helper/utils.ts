import { Page, Locator, expect } from '@playwright/test';

export async function findMenuItemByText(menuItems: any, text: string) {
  return menuItems.locator(`text=${text}`);
}

export async function waitForElementToBeVisible(
  page: Page,
  selector: Locator | string,
  timeout: number = 35000
) {
  if (typeof selector === 'string') {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  } else {
    await selector.waitFor({ state: 'visible', timeout });
  }
}

export async function checkElementsVisibility(
  elements: Locator,
  expectedCount: number
) {
  await expect(elements).toHaveCount(expectedCount);

  for (let i = 0; i < expectedCount; i++) {
    await expect(elements.nth(i)).toBeVisible();
  }
}

export async function checkInputFieldValueOrText(
  field: Locator,
  expectedValue: string,
  checkType: 'value' | 'text' = 'value'
): Promise<void> {
  await waitForElementToBeVisible(this.page, field);
  await expect(field).toBeVisible();

  if (checkType === 'value') {
    await expect(field).toHaveValue(expectedValue);
  } else if (checkType === 'text') {
    await expect(field).toHaveText(expectedValue);
  } else {
    throw new Error(
      `Invalid checkType: ${checkType}. Expected "value" or "text".`
    );
  }
}
