import { Locator, Page } from '@playwright/test';

export class DashboardPage {
  dashboarLabel: Locator;
  chartCards: Locator;

  constructor(page: Page) {
    this.dashboarLabel = page.locator('span.oxd-topbar-header-breadcrumb h6');
    this.chartCards = page.locator('.oxd-sheet.oxd-sheet--rounded');
  }
}
