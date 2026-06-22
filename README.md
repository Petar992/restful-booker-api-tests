# Restful Booker API Test Automation

## Project Overview

This project contains automated API tests for the Restful Booker application using Cypress.

The goal of the project is to validate core booking functionality through positive and negative test scenarios, document identified defects, and demonstrate automated test execution through Continuous Integration.

API Documentation:
https://restful-booker.herokuapp.com/apidoc/index.html

---

## Tech Stack

- Cypress
- JavaScript
- Node.js
- Mochawesome Reporter
- GitHub Actions

---

## Test Strategy

The automation effort focuses on the most critical API workflows:

- Booking creation
- Booking retrieval
- Authentication
- Full booking update
- Partial booking update
- Booking deletion

In addition, negative scenarios were included to validate authorization handling and behavior when accessing non-existing resources.

The selected scenarios provide coverage of the core booking lifecycle while keeping the test suite focused and maintainable.

Additional edge cases and non-functional testing activities were intentionally left out of scope in order to focus on the most critical API workflows and provide a concise, maintainable test suite within the scope of the assignment.

---

## Tool Selection

Cypress was selected because it provides:

- Simple and readable API testing syntax
- Built-in assertions and request handling
- Easy integration with GitHub Actions
- Fast setup and execution
- Support for automated reporting through Mochawesome

---

## Test Case Summary

### Positive Test Cases

| Test Case | Description                                                 |
| --------- | ----------------------------------------------------------- |
| TC01      | Creates a booking using valid booking data                  |
| TC02      | Retrieves a previously created booking by ID                |
| TC03      | Generates an authentication token for authorized requests   |
| TC04      | Updates all booking fields using valid authentication       |
| TC05      | Updates selected booking fields using PATCH                 |
| TC06      | Deletes a booking using valid authentication                |
| TC07      | Verifies API availability through the health check endpoint |

### Negative Test Cases

| Test Case | Description                                                  |
| --------- | ------------------------------------------------------------ |
| TC08      | Verifies the response when requesting a non-existing booking |
| TC09      | Verifies authentication failure with invalid credentials     |
| TC10      | Verifies booking updates are rejected without authentication |
| TC11      | Verifies booking deletion is rejected without authentication |

---

## Test Design Notes

The positive test scenarios are executed as an end-to-end CRUD workflow.

A booking is created once and reused throughout subsequent tests to validate retrieval, update, partial update and deletion operations.

An authentication token is generated once and reused for authorized requests.

This approach was intentionally chosen to validate the complete booking lifecycle while keeping the test suite concise and easy to follow.

Severity and Priority classifications use a three-level scale: Low, Medium, and High.

---

## Project Structure

```text
.
├── .github
│   └── workflows
│       └── cypress.yml
│
├── cypress
│   ├── e2e
│   │   └── api
│   │       └── restful-booker-api.cy.js
│   └── support
│
├── evidence
│   ├── bug-001-delete-status-code.png
│   └── bug-002-health-check-status-code.png
│
├── .gitignore
├── BUG_REPORT.md
├── README.md
├── cypress.config.js
├── package-lock.json
└── package.json
```

## README.md

## Installation

Clone the repository:

```bash
git clone https://github.com/Petar992/restful-booker-api-tests.git
cd restful-booker-api-tests
```

Install dependencies:

```bash
npm install
```

---

## Running Tests

Run all tests in headless mode:

```bash
npx cypress run
```

Open Cypress Test Runner:

```bash
npx cypress open
```

---

## Test Reporting

This project uses Mochawesome to generate detailed test execution reports, including:

- Test execution results
- Passed and failed test cases
- Assertion details
- Execution duration

Reports are generated locally after test execution and are excluded from version control through `.gitignore`.

Generated report files:

```text
reports/
├── mochawesome.html
└── mochawesome.json
```

Open `mochawesome.html` in a browser to review detailed execution results.

---

## Continuous Integration

GitHub Actions is configured to automatically execute the test suite.

### Triggered on

- Push to `main` branch
- Pull Request to `main` branch
- Manual workflow execution (`workflow_dispatch`)

Workflow file:

```text
.github/workflows/cypress.yml
```

---

## Defect Reporting

Any identified defects are documented in:

```text
BUG_REPORT.md
```

Each defect includes:

- Title
- Severity
- Priority
- Environment
- Preconditions
- Steps to Reproduce
- Expected Result
- Actual Result
- Evidence

---

## Assumptions

- The Restful Booker public API is available during execution.
- Test data is created dynamically during runtime.
- Authentication tokens are generated through the API before executing authorized requests.

---

## Author

Petar Jovanović

QA Engineer Assignment
