/// <reference types="cypress" />
import { ACCOUNTS } from '../constants/accounts';

describe('test', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/index.html');
  });

  it('add to cart', () => {
    cy.get('#contcont #itemc')
      .should('have.length', 3)
      .contains('Laptops')
      .click();
    cy.get('.card-title').first().click();
    cy.intercept('**/addtocart').as('addToCart');
    cy.contains('Add to cart').click();
    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
  });

  it('delete item from the cart as logged user', () => {
    cy.loginAPI(ACCOUNTS.main);
    cy.addToCart();
    cy.get('.nav-link').contains('Cart').click();

    cy.get('#tbodyid .success').as('items');
    cy.get('@items')
      .its('length')
      .then((it) => {
        cy.wrap(it);
      })
      .as('length');

    cy.get('@items').first().find('a').should('be.visible').click();
    cy.intercept('**/deleteitem').as('deleteRequest');
    cy.wait('@deleteRequest').its('response.statusCode').should('eq', 200);
    cy.reload();

    cy.get('@items').should('not.exist');
    cy.get('@items').should('have.length.lessThan', 1);
    cy.get('@length').then((it) => {
      cy.get('@items').should('have.length.lessThan', it);
    });
  });

  it('place order', () => {
    const test = 'hello';
    cy.loginAPI(ACCOUNTS.main);
    cy.get('.nav-link').contains('Cart').click();
    cy.get('[data-target="#orderModal"]').click();
    cy.get('#orderModal .modal-content').should('be.visible').as('modal');

    cy.get('#name').type(test);
    cy.get('#country').type(test);
    cy.get('#city').type(test);
    cy.get('#card').type(test);
    cy.get('#month').type(test);
    cy.get('#year').type(test);
    cy.get('@modal').find('.modal-footer').contains('Purchase').click();

    cy.get('.sweet-alert')
      .filter(':contains("Thank you for your purchase!")')
      .should('be.visible')
      .find('.confirm')
      .click();
  });
});
describe('test2', () => {
  beforeEach(() => {
    cy.visit('https://artoftesting.com/samplesiteforselenium');
  });

  it('checkbox test', () => {
    cy.get('.Automation').check().should('be.checked');
  });

  it('radio btn test', () => {
    cy.get('#male').check().should('not.be.checked');
  });

  it('select test', () => {
    cy.get('#testingDropdown')
      .select('Manual Testing')
      .invoke('val')
      .should('deep.equal', 'Manual');
  });

  it('link check test', () => {
    cy.get('#commonWebElements a')
      .filter(':contains("This is a link")')
      .then((it) => cy.request(it.prop('href'))); // just do request but not open
  });
});

describe('TEST111', () => {
  it('TEST', () => {
    cy.visit('https://unsplash.com/');
    cy.get('a[itemprop="contentUrl"] img')
      .first()
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  });

  it('sdsdsd', () => {
    type CarYear = number;
    type CarType = string;
    type CarModel = string;
    type Car = {
      year: CarYear;
      type: CarType;
      model: CarModel;
    };
  });
});
