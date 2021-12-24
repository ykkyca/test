/// <reference types="cypress" />

const chai = require('chai');
const assert = chai.assert;



export function waitPageToLoad(urlPartialText) {
    cy.url({ timeout: 25000 }).
        should('include', urlPartialText);

}

export function assertPriceFilter(elementList, fromDouble, toDouble) {
    elementList.each((item) => {
        cy.wrap(item).invoke('attr', 'content').
            then(parseFloat).
            should('be.lt', toDouble).
            and('be.above', fromDouble);

    })
}

export function validatePageTitle(titleText) {
    cy.get('head title').
        should('have.text', titleText);
}

export function validatePageTitleContains(partialTitleText) {
    cy.get('head title', { timeout: 15000 }).
        should('contain', partialTitleText);

}

export function assertTextIsVisible(element, text) {
    element.
        should('have.text', text);
}

export function assertElementContainsText(element, text) {
    element.
        should('contain', text);
}

