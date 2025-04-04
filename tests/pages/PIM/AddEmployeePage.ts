import { Page, Locator, expect } from '@playwright/test';
import * as utils from ' ../../../helper/utils';

export class AddEmployeePage {
  page: Page;
  pimMenuItems: Locator;
  addEmployeeLabel: Locator;
  firstNameField: Locator;
  middleNameField: Locator;
  lastNameField: Locator;
  employeeIdField: Locator;
  saveEmployeeButton: Locator;
  errorMessages: Locator;
  inputFields: Locator;
  fields: Locator;
  createLoginDeatailsToggle: Locator;
  messageSelector: Locator;

  constructor(page: Page) {
    this.pimMenuItems = page.locator('a.oxd-topbar-body-nav-tab-item');
    this.addEmployeeLabel = page.locator('h6.oxd-text.orangehrm-main-title');
    this.firstNameField = page.locator('input[name="firstName"]');
    this.middleNameField = page.locator('input[name="middleName"]');
    this.lastNameField = page.locator('input[name="lastName"]');
    this.saveEmployeeButton = page.locator('button[type="submit"]');
    this.errorMessages = page.locator('.oxd-input-field-error-message');
    this.inputFields = page.locator('input.oxd-input--error');
    this.fields = page.locator('input.oxd-input.oxd-input');
    this.createLoginDeatailsToggle = page.locator('span.oxd-switch-input');
    this.messageSelector = page.locator('div.oxd-toast-container');
  }

  async addEmployee(options: {
    page: Page;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    employeeId?: string;
    createLogin?: boolean;
    userName?: string;
    password?: string;
  }): Promise<void> {
    const {
      page,
      firstName = '',
      lastName = '',
      middleName = '',
      employeeId = '',
      createLogin = false,
      userName = '',
      password = '',
    } = options;

    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);

    if (middleName) {
      await this.middleNameField.fill(middleName);
    }

    await this.fields.nth(4).clear();
    await this.fields.nth(4).fill(employeeId);

    if (createLogin) {
      await this.createLoginDeatailsToggle.click();
      await utils.waitForElementToBeVisible(page, this.fields.nth(5));
      await this.fields.nth(5).fill(userName);
      await this.fields.nth(6).fill(password);
      await this.fields.nth(7).fill(password);
    }

    await this.saveEmployeeButton.click();
  }

  async checkMessage(expectedText: string) {
    await utils.waitForElementToBeVisible(this.page, this.messageSelector);
    const actualMessage = await this.messageSelector.textContent();
    expect(actualMessage).toContain(expectedText);
  }
}
