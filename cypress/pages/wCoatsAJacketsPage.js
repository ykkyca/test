/// <reference types="cypress" />

class wCoatsAJacketsPage {

    elements = {
       //itemPriceList: () => cy.get('.product-pricing-flex-inner .product-sales-price'),
       itemPriceList: () => cy.get('meta[itemprop="price"]'),

    }



navigateToWomanCoatsAndJackets() {
    cy.visit('/womens/coats-jackets');
}


}

module.exports = new wCoatsAJacketsPage();