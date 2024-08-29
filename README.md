This project contains some tests of a mock shopping store application, using JavaScript and Playwright.

To get started, ensure that you have [Node.js](https://nodejs.org/) installed on your machine. Then, follow the steps below to install the necessary dependencies:

1. Clone the repository:
    ```bash
    git clone https://github.com/Tobbil/JS-Playwright.git
    cd JS-Playwright
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Install Playwright browsers:
    ```bash
    npm playwright install
    ```

### Running Tests

Before running the tests, download ```shopping-store-linux-amd64``` and start it locally.

To run all the tests in the project, use the following command:

```bash
npm test
```

To run a specific test file:
```bash
npm test path/to/your-test-file.spec.js
```

To run tests in UI mode:
```bash
npm run ui
```



