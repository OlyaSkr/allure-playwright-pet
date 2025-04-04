# Playwright Pet Project

This is a Playwright project for end-to-end testing of a web application.

## Table of Contents

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Allure Report](#allure-report)
- [Test Structure](#test-structure)
- [Configuration](#configuration)
- [Custom Helpers](#custom-helpers)
- [License](#license)

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/OlyaSkr/allure-playwright-pet.git
   ```
2. Install the necessary dependencies using npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Install Playwright:
   npx playwright install

## Prerequisites

Node.js (>= 14.0.0)

npm or yarn for package management

## Setup

Before running the tests, make sure the necessary environment variables are set, such credentials. A .env file could be created in the root directory to define environment variables like:

```bash
 LOGIN_USERNAME=your_username
 LOGIN_PASSWORD=your_password
```

## Runing tests

#### Run all tests

To run the tests in headless mode, use the following command:

```bash
npm run test:all:headless
```

To run the tests in headed mode, use the following command:

```bash
npm run test:chrome:headed
```

#### Run a specific test file

To run a specific test file, use:

```bash
npm run test:all:login:headless
```

## Allure Report

Before generating the Allure report, ensure that Java is installed on your local machine.

To generate the Allure report, use the following command:

```bash
npm run allure:generate
```

To open the allure report use the following command:

```bash
npm run allure:open
```

## Test Structure

The test files and supporting resources are organized as follows:

```bash
data/                           # Test data files
│
├── commonData.json
├── dashboardData.json
└── pimData.json
│
helper/                         # Helper functions
│
├── helper.ts                    # General helper functions for common tasks
└── utils.ts                     # Utility functions for common operations

tests/                          # Test scripts
│
├── pages/                       # Page Object Model (POM) files
│   ├── PIM/
│   │   ├── AddEmployeePage.ts
│   │   ├── EmployeeListPage.ts
│   ├── BasePage.ts
│   ├── DashboardPage.ts
│   ├── HeaderPage.ts
│   ├── LoginPage.ts
│   ├── SidebarPage.ts
│
├── specs/                       # Test case scripts
│   ├── addEmployee.spec.ts
│   ├── login.spec.ts

```

## Configuration

In the playwright.config.ts file includes settings of the test runner, workers, timeout, and more.

## Custom Helpers

Some custom helper functions in /helper/utils.ts. These helpers are designed to simplify commonly used actions like waiting for an element to be visible, find an element by text etc.

## License

ISC
