import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  usernameField: Locator;
  passwordField: Locator;
  loginButton: Locator;
  dashboardLabel: Locator;
  userProfileName: Locator;
  logoutButton: Locator;
  errorMessages: Locator;
  invalidCredentialsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.locator('[type="submit"]');
    this.dashboardLabel = page.locator('span.oxd-topbar-header-breadcrumb h6');
    this.userProfileName = page.locator('.oxd-userdropdown-name');
    this.logoutButton = page.locator('[role="menuitem"]:has-text("Logout")');
    this.errorMessages = page.locator('span.oxd-input-field-error-message');
    this.invalidCredentialsMessage = page.locator('p.oxd-alert-content-text');
  }

  // Login
  async login(username: any, password: any): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  // Logout
  async logout(): Promise<void> {
    await this.userProfileName.click();
    await this.logoutButton.click();
  }

  async usernameErrorMessageText(): Promise<string> {
    const text = await this.errorMessages.nth(0).textContent();
    return text ?? '';
  }

  async passwordErrorMessageText(): Promise<string> {
    const text = await this.errorMessages.nth(1).textContent();
    return text ?? '';
  }

  async invalidCredentialsMessageText(): Promise<string> {
    const text = await this.invalidCredentialsMessage.textContent();
    return text ?? '';
  }
}
