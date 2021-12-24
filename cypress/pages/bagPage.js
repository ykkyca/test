/// <reference types="cypress" />


class bagPage {
    

    elements = {

        itemName: () => cy.get('.product-list-item .name a'),
        itemSku: () => cy.get('.sku .value'),
        itemColour: () => cy.get('[data-attribute="color"] > .value'),
        itemSize: () => cy.get('[data-attribute="size"] > .value'), 
        itemQuantity:() => cy.get('input.cart-input-quantity'),
        itemPrice:() => cy.get('.item-price .price-sales'), //'div.cart-cell.item-price .price-sales'
        emptyBagPageTitle:()=> cy.get('.cart-empty-title'),
        continueShoppingBtn:()=> cy.get('.cart-empty a'),
        removeLink:()=> cy.get('button[value="Remove"]'),
        totalPrice:()=> cy.get('.price-total'),
        orderTotal:()=> cy.get('.order-value'),
        checkoutBtn:()=> cy.get('.js-second-button-checkout')

    }

    navigate() {
        cy.visit('/cart');
    }

    deleteBagItem(){
        this.elements.removeLink().click();
    }

    assertItemInBag (itemName, itemSku, itemColour, itemSize, quantity, itemPrice, totalPrice) {
        this.elements.itemName().should('contain', itemName);
        this.elements.itemSku().should('contain', itemSku);
        this.elements.itemColour().should('contain', itemColour);
        this.elements.itemSize().should('contain', itemSize);

        this.elements.itemQuantity().should('have.attr', 'value', quantity);
        this.elements.itemPrice().should('contain', itemPrice);
        this.elements.totalPrice().should('contain', totalPrice);
    }

    modifyQuantity(newQuantity) {
        this.elements.itemQuantity().clear();
        this.elements.itemQuantity().type(newQuantity + '{enter}');
    }

    assertQuantity(quantity) {
        this.elements.itemQuantity().should('have.attr', 'value', quantity);
    }

    assertBagEmptyState(title, btnText) {
        this.elements.emptyBagPageTitle().should('contain', title);
        this.elements.continueShoppingBtn().should('contain', btnText);
    }

    assertTotalPrice(totalPrice){
        this.elements.totalPrice().should('contain', totalPrice);
    }

    assertOrderWithStandardDeliveryPrice(orderPrice) {
        this.elements.orderTotal().should('contain', orderPrice);
    }

    clickCheckoutBtn() {
        this.elements.checkoutBtn().click();
    }



    









}

module.exports = new bagPage();