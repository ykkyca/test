/// <reference types="cypress" />

class accountPage {

    elements = {
        welcomeMessage: () => cy.get('.account-welcome h4'),
        logOutBtn: () => cy.get('.account-logout'),
        pageHeader: () => cy.get('.account-page-title'),
        addressLink: () => cy.get('a[title="Manage your billing and shipping addresses"]'),

    }

    navigate() {
        cy.visit('/myaccount');
    }

    clickLogOutBtn() {
        this.elements.logOutBtn().click();
    }

    clickAddressLink() {
        this.elements.addressLink().click();
    }




}

module.exports = new accountPage();