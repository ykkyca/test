/// <reference types="cypress" />

class wishlistPage {

    elements = {
        itemName: () => cy.get('.product-list-item .name a'),
        itemSku: () => cy.get('.sku .value'),
        itemColour: () => cy.get('.product-list-item > [data-attribute="color"] > .value'),
        itemSize: () => cy.get('.product-list-item > [data-attribute="size"] > .value'), 
        itemQuantity:() => cy.get('.option-quantity-desired .input-text'),
        itemPrice:() => cy.get('.wishlist-table-col .item-price .price-sales'),
        emptyWishlistPageTitle:()=> cy.get('.wishlist-empty-title'),
        emptyWishlistMessage:() => cy.get('.wishlist-empty-message'),
        startShoppingBtn:()=> cy.get('.wishlist-empty a'),
        removeLink:()=> cy.get('.cart-row .button-remove-text'),


    }

    navigate() {
        cy.visit('/wishlist');
    }

    deleteWishlistItem(){
        this.elements.removeLink().click();
    }

    assertItemInWishlist (itemName, itemSku, itemColour, itemSize, quantity, itemPrice) {
        this.elements.itemName().should('contain', itemName);
        this.elements.itemSku().should('contain', itemSku);
        this.elements.itemColour().should('contain', itemColour);
        this.elements.itemSize().should('contain', itemSize);

        this.elements.itemQuantity().should('have.attr', 'value', quantity);
        this.elements.itemPrice().should('contain', itemPrice);
    }

    modifyQuantity(newQuantity) {
        this.elements.itemQuantity().clear();
        this.elements.itemQuantity().type(newQuantity + '{enter}');
    }

    assertQuantity(quantity) {
        this.elements.itemQuantity().should('have.attr', 'value', quantity);
    }

    assertWishlistEmptyState(title, message, btnText) { 
        this.elements.emptyWishlistPageTitle().should('contain.text', title);
        this.elements.emptyWishlistMessage().should('contain.text', message);
        this.elements.startShoppingBtn().should('contain.text', btnText);
    }

    









}

module.exports = new wishlistPage();