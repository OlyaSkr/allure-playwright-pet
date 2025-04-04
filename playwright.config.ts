import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: 1,

  reporter: [['html'], ['allure-playwright']],

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      username: process.env.LOGIN_USERNAME || '',
      password: process.env.LOGIN_PASSWORD || '',
    },
    video: 'retain-on-failure',
    screenshot: { mode: 'on', fullPage: true },
    bypassCSP: true,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
