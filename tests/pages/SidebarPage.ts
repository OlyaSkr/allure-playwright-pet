import { Page, Locator } from '@playwright/test';

export class SidebarPage {
  sidebarMenuItems: Locator;

  constructor(page: Page) {
    this.sidebarMenuItems = page.locator('a.oxd-main-menu-item span');
  }

  async findMenuItemByText(text: string) {
    return this.sidebarMenuItems.locator(`text=${text}`);
  }
}
