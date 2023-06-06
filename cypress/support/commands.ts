/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add("createUser", (user) => {
//   cy.request({
//     method: "POST",
//     url: "https://www.example.com/tokens",
//     body: {
//       email: "admin_username",
//       password: "admin_password",
//     },
//   }).then((resp) => {
//     cy.request({
//       method: "POST",
//       url: "https://www.example.com/users",
//       headers: { Authorization: "Bearer " + resp.body.token },
//       body: user,
//     });
//   });
// });

Cypress.Commands.add('loginAPI', (accounts) => {
  cy.request('POST', 'https://api.demoblaze.com/login', {
    username: accounts.username,
    password: accounts.password,
  }).then((res) => {
    expect(res.body).not.to.empty;
    cy.setCookie('tokenp_', res.body.replaceAll('Auth_token: ', ''));
  });
});

Cypress.Commands.add('addToCart', () => {
  cy.getCookie('tokenp_').then((it) => {
    expect(it).not.be.empty;
    cy.log(it.value);
    cy.request('POST', 'https://api.demoblaze.com/addtocart', {
      cookie: `${it.value}`,
      flag: true,
      id: `2b00da62-b7ad-6c1a-8699-6c7a68131c${Cypress._.random(10,20)}`,
      prod_id: 1,
    })
      .its('status')
      .should('eq', 200);
  });
});

Cypress.Commands.add('isInViewport', (el) => {
  return cy.get(el).then(($el) => {
    cy.window().then((window) => {
      const { documentElement } = window.document;
      const windowHeight = documentElement.clientHeight;
      const windowWidth = documentElement.clientWidth;
      const rect = $el[0].getBoundingClientRect();

      const message = `Expected to find ${el} in viewport`;
      const isInsideViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= windowWidth;
      expect(isInsideViewport, message).to.be.true;
    });
  });
});

Cypress.Commands.add('isNotInViewport', (el) => {
  return cy.get(el).then(($el) => {
    cy.window().then((window) => {
      const { documentElement } = window.document;
      const windowHeight = documentElement.clientHeight;
      const windowWidth = documentElement.clientWidth;
      const rect = $el[0].getBoundingClientRect();

      const message = `Did not expect to find ${el} in viewport`;
      const isOutsideViewport =
        rect.bottom < 0 ||
        rect.right < 0 ||
        rect.left > windowWidth ||
        rect.top > windowHeight;

      expect(isOutsideViewport, message).to.be.true;
    });
  });
});

declare namespace Cypress {
  interface Chainable {
    loginAPI(accounts: { username: string; password: string }): Chainable<void>;
    addToCart(): Chainable<void>;
    isInViewport(element: string): Chainable<JQuery<HTMLElement>>;
    isNotInViewport(element: string): Chainable<JQuery<HTMLElement>>;
  }
}
