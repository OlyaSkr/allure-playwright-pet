import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SidebarPage } from '../pages/SidebarPage';
import { HeaderPage } from '../pages/HeaderPage';
import { AddEmployeePage } from '../pages/PIM/AddEmployeePage';
import { EmployeeListPage } from '../pages/PIM/EmployeeListPage';
import * as commonData from '../../data/commonData.json';
import * as menuHelper from '../../helper/helper';
import * as utils from '../../helper/utils';
import * as pimData from '../../data/pimData.json';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Add employee tests', () => {
  let firstName: string;
  let lastName: string;
  let employeeId: string;
  let middleName: string;
  let userName: string;
  let password: string;
  let loginPage: LoginPage;
  let sidebarPage: SidebarPage;
  let headerPage: HeaderPage;
  let addEmployeePage: AddEmployeePage;
  let employeeListPage: EmployeeListPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    sidebarPage = new SidebarPage(page);
    headerPage = new HeaderPage(page);
    addEmployeePage = new AddEmployeePage(page);
    employeeListPage = new EmployeeListPage(page);
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    middleName = faker.person.firstName();
    employeeId = menuHelper.generateRandomId();
    userName = menuHelper.generateUsername();
    password = menuHelper.generatePassword();
    await loginPage.goto('/web/index.php/auth/login');
    await loginPage.login(
      process.env.LOGIN_USERNAME,
      process.env.LOGIN_PASSWORD
    );
  });

  test('Add new employee with valid data and not create login detalis', async ({
    page,
    context,
  }) => {
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    });

    const menuItem = await utils.findMenuItemByText(
      sidebarPage.sidebarMenuItems,
      commonData.sidebarMenuLabels.pimSidebarItem
    );
    const addEmployeeMenuItem = await utils.findMenuItemByText(
      addEmployeePage.pimMenuItems,
      pimData.pimTopbarMenuItems.addEmployeeItem
    );

    await menuItem.click();
    await expect(headerPage.topbarLabel).toBeVisible();
    await expect(headerPage.topbarLabel).toHaveText(
      commonData.topbarMenuLabels.pimTitle
    );

    await addEmployeeMenuItem.click();
    await expect(addEmployeePage.addEmployeeLabel).toBeVisible();
    await expect(addEmployeePage.addEmployeeLabel).toHaveText(
      pimData.pimTopbarMenuItems.addEmployeeItem
    );

    await addEmployeePage.addEmployee({
      page,
      firstName: firstName,
      lastName: lastName,
      employeeId: employeeId,
      createLogin: false,
    });

    addEmployeePage.checkMessage(commonData.messages.successCreateUserMessage);

    await utils.checkInputFieldValueOrText(
      employeeListPage.employeeFullName,
      `${firstName} ${lastName}`,
      'text'
    );
    await utils.checkInputFieldValueOrText(
      employeeListPage.employeeFirstName,
      `${firstName}`
    );
    await utils.checkInputFieldValueOrText(
      employeeListPage.employeeLastName,
      `${lastName}`
    );
  });

  test('Add new employee with valid data and with login detalis', async ({
    page,
    context,
  }) => {
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    });

    const menuItem = await utils.findMenuItemByText(
      sidebarPage.sidebarMenuItems,
      commonData.sidebarMenuLabels.pimSidebarItem
    );
    const addEmployeeMenuItem = await utils.findMenuItemByText(
      addEmployeePage.pimMenuItems,
      pimData.pimTopbarMenuItems.addEmployeeItem
    );

    await menuItem.click();
    await expect(headerPage.topbarLabel).toBeVisible();
    await expect(headerPage.topbarLabel).toHaveText(
      commonData.topbarMenuLabels.pimTitle
    );

    await addEmployeeMenuItem.click();
    await expect(addEmployeePage.addEmployeeLabel).toBeVisible();
    await expect(addEmployeePage.addEmployeeLabel).toHaveText(
      pimData.pimTopbarMenuItems.addEmployeeItem
    );

    await addEmployeePage.addEmployee({
      page,
      firstName: firstName,
      lastName: lastName,
      employeeId: employeeId,
      createLogin: true,
      userName: userName,
      password: password,
    });

    addEmployeePage.checkMessage(commonData.messages.successCreateUserMessage);

    await utils.checkInputFieldValueOrText(
      employeeListPage.employeeFullName,
      `${firstName} ${lastName}`,
      'text'
    );
    await utils.checkInputFieldValueOrText(
      employeeListPage.employeeFirstName,
      `${firstName}`
    );
    await utils.checkInputFieldValueOrText(
      employeeListPage.employeeLastName,
      `${lastName}`
    );

    await loginPage.logout();
    await loginPage.login(userName, password);
    const usernameFull = await page
      .locator('.oxd-userdropdown-name')
      .textContent();
    expect(usernameFull?.trim()).toContain(`${firstName} ${lastName}`);
  });

  test.afterEach('Close the page', async ({ page }) => {
    await loginPage.logout();
    await page.close();
  });
});
