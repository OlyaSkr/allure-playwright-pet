import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as utils from '../../helper/utils';
import { DashboardPage } from '../pages/DashboardPage';
import { HeaderPage } from '../pages/HeaderPage';
import * as dashboardData from '../../data/dashboardData.json';
import * as commonData from '../../data/commonData.json';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Login tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let headerPage: HeaderPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    headerPage = new HeaderPage(page);
    await loginPage.goto(commonData.endpoints.loginPage);
    await expect(page).toHaveTitle(commonData.urlTitle);
  });

  test('login with valid credentials', async () => {
    const username = process.env.LOGIN_USERNAME;
    const password = process.env.LOGIN_PASSWORD;

    await loginPage.login(username, password);
    await expect(headerPage.topbarLabel).toBeVisible();
    await expect(headerPage.topbarLabel).toHaveText(
      commonData.topbarMenuLabels.dashboardTitle
    );
    await utils.checkElementsVisibility(
      dashboardPage.chartCards,
      Number(dashboardData.chartCardsCount)
    );
  });

  test('login with empty fields', async () => {
    const username = '';
    const password = '';

    await loginPage.login(username, password);

    const usernameErrorMessage = await loginPage.usernameErrorMessageText();
    expect(usernameErrorMessage).toBe(
      commonData.messages.loginErrors.fieldsRequired
    );

    const passwordErrorMessage = await loginPage.passwordErrorMessageText();
    expect(passwordErrorMessage).toBe(
      commonData.messages.loginErrors.fieldsRequired
    );
  });

  test('login with invalid credentials', async () => {
    const username = faker.internet.username();
    const password = faker.internet.password({
      length: 8,
      memorable: false,
      pattern: /[a-zA-Z0-9!@#$%^&*()_+<>?]/,
    });

    await loginPage.login(username, password);

    const invalidCredentialsMessage =
      await loginPage.invalidCredentialsMessageText();
    expect(invalidCredentialsMessage).toBe(
      commonData.messages.loginErrors.invalidCredentials
    );
  });
  test.afterEach('Close the page', async ({ page }) => {
    await page.close();
  });
});
