/// <reference types="cypress" />

describe('test something', () => {
  it('men jeans', () => {
    cy.visit('https://www.automationexercise.com/');

    cy.contains('Men').click();
    cy.contains('Jeans').click();
    cy.get('.product-image-wrapper')
      .should('be.visible')
      .and('have.length.at.least', 1);
  });

  it('background color test', () => {
    cy.visit('https://www.automationexercise.com/brand_products/H&M');

    cy.get('.productinfo')
      .filter(':contains("Men Tshirt")')
      .as('item')
      .realHover()
      .wait(1000)
      .then(() => {
        cy.get('.product-overlay')
          .first()
          .should('have.css', 'background-color')
          .and('contain', 'rgb(254, 152, 15)');
      });
  });

  it('carousel', () => {
    cy.visit('https://www.automationexercise.com/');
    // check that the first element is active
    cy.get('#slider-carousel')
      .as('slider')
      .find('.item')
      .as('sliders')
      .first()
      .should('have.class', 'active');
    // click on next slide
    cy.get('@slider').find('[data-slide="next"]').click();
    // check that the first element is not active
    cy.get('@sliders').first().should('not.have.class', 'active');
    // check that the second element is active
    cy.get('@sliders').eq(1).should('have.class', 'active');
  });

  it('contact form', () => {
    cy.visit('https://www.automationexercise.com/contact_us');

    cy.get('[data-qa="name"]').type('Hello');
    cy.get('[data-qa="email"]').type('Hello@Hello');
    cy.get('[data-qa="subject"]').type('Hello');
    cy.get('[data-qa="message"]').type('Hello');
    cy.get('[name="upload_file"]').selectFile('./package.json');

    cy.get('[data-qa="submit-button"]').click();
    cy.get('.contact-form .alert-success').should(
      'have.text',
      'Success! Your details have been submitted successfully.',
    );
  });

  it('subscription', () => {
    cy.visit('https://www.automationexercise.com/contact_us');

    cy.get('[data-qa="name"]').type('Hello');
    cy.get('[data-qa="email"]').type('Hello@Hello');
    cy.get('[data-qa="subject"]').type('Hello');
    cy.get('[data-qa="message"]').type('Hello');
    cy.get('[name="upload_file"]').selectFile('./package.json');

    cy.get('[data-qa="submit-button"]').click();
    cy.get('.contact-form .alert-success').should(
      'have.text',
      'Success! Your details have been submitted successfully.',
    );
  });

  it('subscription', () => {
    cy.visit('https://www.automationexercise.com/products');

    cy.get('#susbscribe_email').type('Hello@dsds');
    cy.get('#subscribe').click();
    cy.get('.alert-success').should(
      'have.text',
      'You have been successfully subscribed!',
    );
  });

  it('is in viewport', () => {
    cy.visit('https://www.automationexercise.com/products');
    cy.get('#susbscribe_email').scrollIntoView();
    cy.isInViewport('#susbscribe_email');
  });

  it('is not in viewport', () => {
    cy.visit('https://www.automationexercise.com/products');
    cy.isNotInViewport('#susbscribe_email');
  });

  it('test', () => {});
});
