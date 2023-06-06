import './commands';
import 'cypress-mochawesome-reporter/register'
import "cypress-real-events";

beforeEach(function () {
  const testSuite = Cypress.env('SUITE');
  if (!testSuite) {
    return;
  }

  const testName = Cypress.currentTest.title;
  const formattedTestSuite = `<${testSuite}>`;
  if (testName && !testName.includes(formattedTestSuite)) {
    this.skip();
  }
});