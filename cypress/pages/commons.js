/// <reference types="cypress" />


class commons {

    elements = {
        priceFilter: () => cy.get('.price .refinement-head-label'),
        priceFilterList: () => cy.get('span.refinement-link-radio span.refinement-link-copy'),
    }


    clickPriceFilter() {
        this.elements.priceFilter().
            click();

    }

    filterByPrice(filter) {
        this.elements.priceFilterList().
            contains(filter).click();
    }

    navigateToPDP(sku) {
        cy.
            visit(`https://uk-dwdev.boohoo.com/plus-leopard-midi-dress/${sku}.html`);
    }


}

module.exports = new commons();