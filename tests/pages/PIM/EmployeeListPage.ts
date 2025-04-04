import { Page, Locator, expect } from '@playwright/test';
import { SidebarPage } from '../../pages/SidebarPage';
import { AddEmployeePage } from './AddEmployeePage';

export class EmployeeListPage {
  page: Page;
  employeeFullName: Locator;
  employeeFirstName: Locator;
  employeeLastName: Locator;
  employeeIdField: Locator;
  searchButton: Locator;
  namesInputFields: Locator;
  rowLocator: (employeeId: string) => Locator;
  deleteButton: (employeeId: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeFullName = page.locator('.orangehrm-edit-employee-name h6');
    this.employeeFirstName = page.locator('[name="firstName"]');
    this.employeeLastName = page.locator('[name="lastName"]');
    this.employeeIdField = page.locator('div.oxd-form-row input.oxd-input');
    this.namesInputFields = page.locator(
      'input[placeholder="Type for hints..."]'
    );
    this.searchButton = page.locator('[type="submit"]');

    this.rowLocator = (employeeId: string) =>
      page.locator(`.oxd-table-row:has(div:has-text("${employeeId}"))`);

    this.deleteButton = (employeeId: string) =>
      this.rowLocator(employeeId).locator('.bi-trash');
  }

  async navigateToEmployeeList(): Promise<void> {
    const employeeListTab = this.page.locator(
      'a.oxd-topbar-body-nav-tab-item',
      { hasText: 'Employee List' }
    );
    await employeeListTab.click();
  }

  async deleteEmployee(employeeId: string): Promise<void> {
    const sidebarPage = new SidebarPage(this.page);
    const addEmployeePage = new AddEmployeePage(this.page);
    const trimmedEmployeeId = employeeId.trim();

    await this.namesInputFields
      .nth(0)
      .waitFor({ state: 'visible', timeout: 5000 });
    await this.namesInputFields.nth(0).click();
    await this.namesInputFields.nth(0).fill(employeeId);
    await expect(this.searchButton).toBeVisible();
    await this.searchButton.click();

    const row = this.rowLocator(trimmedEmployeeId);
    await expect(row).toBeVisible();
    const deleteBtn = this.deleteButton(trimmedEmployeeId);

    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();
  }
}
