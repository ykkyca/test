/// <reference types="cypress" />

declare namespace Cypress {

interface Chainable {
    /**
     * Go to baseUrl, accept cookies and dismiss first visit banner
     * @example cy.navigateAndDismissAll();
     */
     navigateAndDismissAll();
}

interface Chainable {
    /**
     * Login user with passed credentials
     * @example cy.login('test@test.com', 'test123');
     * @param email String
     * @param password String
     */
    login(email, password);
}

interface Chainable {
    /**
     * Logout currently logged in user
     * @example cy.logOut();
     */
    logOut();
}





}