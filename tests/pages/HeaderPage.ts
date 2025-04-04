import { Locator, Page } from '@playwright/test';

export class HeaderPage {
  topbarLabel: Locator;

  constructor(page: Page) {
    this.topbarLabel = page.locator('span.oxd-topbar-header-breadcrumb h6');
  }
}
