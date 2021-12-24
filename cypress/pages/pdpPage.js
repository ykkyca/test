/// <reference types="cypress" />


class pdpPage {

    elements = {

        wishListIcon: () => cy.get('.wishlist-button'),
        addToBagBtn: () => cy.get('button#add-to-cart'),
        miniBagAction: () => cy.get('.mini-cart-content.js-mini-cart-content'),
        miniBagViewBagBtn: () => cy.get('.mini-cart-link-cart')

    }



    selectColour(colour) {
        cy.get(`[title="Select Colour: ${colour}"]`).click({ force: true });
    }

    selectSize(size) {
        cy.get(`[title='Select Size: ${size}']`).click({ force: true });
    }

    clickAddToWishListIcon() {
        this.elements.wishListIcon().should('not.have.attr', 'disabled').then(() => {
            this.elements.wishListIcon().click({ force: true })
        })

    }

    clickAddToBagBtn() {
        this.elements.addToBagBtn().
            should('not.have.attr', 'disabled').then(() => {
                this.elements.addToBagBtn().click({ force: true });
            })

        // clickAddToBagBtn(){
        //     this.elements.addToBagBtn().then(($btn) => {
        //         cy.wrap($btn).should('not.have.attr', 'disabled').then(() => {
        //             this.elements.addToBagBtn().click();
        //     })
        // })

    }

    clickMiniBagViewBagBtn() {
        this.elements.miniBagViewBagBtn().click();
    }

    hoverMiniBagIcon() {
        this.elements.miniBagAction().invoke('show');
    }

}

module.exports = new pdpPage();