// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@applitools/eyes-cypress/commands'


// Import commands.js using ES2015 syntax:
import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
    //by returning false, we are preventing Cypress from failing the test cause app code issues
})


before(function() {

    cy.fixture('user').then(function (data) {
        this.data = data;
    })

    cy.fixture('products').then(function (products) {
        this.products = products;
    })

    cy.fixture('wishlist').then(function (wishlist) {
        this.wishlist = wishlist;
    })

    cy.fixture('bag').then(function (bag) {
        this.bag = bag;
    })

    cy.fixture('address').then(function (address) {
        this.address = address;
    })

    
    cy.fixture('creditCard').then(function(creditCard) {
        this.creditCard=creditCard;
    })
    

})

beforeEach(() => {
    cy.navigateAndDismissAll();

})


// Alternatively you can use CommonJS syntax:
// require('./commands')
