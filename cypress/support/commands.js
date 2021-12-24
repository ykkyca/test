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

import homePage from "../pages/homePage";
import loginPage from "../pages/loginPage";
import accountPage from "../pages/accountPage"

Cypress.Commands.add('navigateAndDismissAll', () => {
    // cy.intercept('/on/demandware.store/Sites-boohoo-UK-Site/en_GB/NewsletterSubscribe-FirstVisit').as('loadFirstVisit');
    homePage.navigate();
    homePage.acceptCookies();
    // cy.wait('@loadFirstVisit').its('status').should('not.exist');     
    // homePage.dismissPremier();
}) 

Cypress.Commands.add('login', (email, password) => {
    loginPage.navigate();
    loginPage.typeEmail(email);
    loginPage.typePassword(password);
    loginPage.clickLoginBtn();
})

Cypress.Commands.add('logOut', () => {
    accountPage.navigate();
    accountPage.clickLogOutBtn();
    
})