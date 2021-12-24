/// <reference types="cypress" />


import {assertElementContainsText} from "../integration/commonFunctions";

class checkoutPage {

    elements = {

        proceedToBillingBtn:()=> cy.get('.js-checkout-next-step-btn'),
        useOriginalAddressBtn:()=> cy.get('.verification-address-button'),
        paymentDetailsCard:()=> cy.get('[for="is-CREDIT_CARD"]'),
        savedCardsDropDown:()=> cy.get('#creditCardList'),
        payNowBtn:()=> cy.get('#billingSubmitButton'),
        cardNumberField:()=> cy.get('body.pt_checkout-body #main #cc_cardNumber'),
        cardOwnerField:()=> cy.get('body.pt_checkout-body #main #dwfrm_billing_paymentMethods_creditCard_owner'),
        cardExpirationDateField:()=> cy.get('body.pt_checkout-body #main #cc_expDate'),
        cardSecurityCodeField:()=> cy.get('body.pt_checkout-body #main .input-text.cvn'),
        saveCardCheckbox:()=> cy.get('#dwfrm_billing_paymentMethods_creditCard_saveCard'),
        invalidCardErrorMessasge:()=> cy.get('#error-class-id'),
        orderConfirmationMessage:()=> cy.get('.confirmation-message-title'),
        orderConfirmationOrderNumber:()=> cy.get('.orderdetails-header-number > .value'),
        orderTotalPrice:()=> cy.get('.order-value'),

        dpdPreciseDeliveryCard:()=> cy.get('[for="shipping-method-precise"]'),
        ukStandardDeliveryCard:()=> cy.get('[for="shipping-method-UKNextDayDelivery"]'),

    }

        

    navigate() {
        cy.visit('/cart');
    }

    //shipping
    clickProceedToBillingBtn(){
        this.elements.proceedToBillingBtn().click();
    }

    clickUseOriginalAddressBtn(){
        this.elements.useOriginalAddressBtn().click();
    }

    clickDpdDeliveryCard(){
        this.elements.dpdPreciseDeliveryCard().click();
    }

    clickUKStandardDeliveryCard(){
        this.elements.ukStandardDeliveryCard().click();
    }
    

    //billing & payement

    clickCardLabel(){
        this.elements.paymentDetailsCard().click();
    }

    selectExistingCard(cardName){
        this.elements.savedCardsDropDown().select(cardName);

    }

    typeCardNumber(cardNumber) {
        this.elements.cardNumberField().type(cardNumber);
    }

    typeCardOwner(cardOwner) {
        this.elements.cardOwnerField().type(cardOwner);
    }

    typeCardExpirationDate(dateNoFormat){
        this.elements.cardExpirationDateField().type(dateNoFormat);
    }
    typeSecurityCode(securityCode) {
        this.elements.cardSecurityCodeField().type(securityCode, {force:true});
    }

    fillNewCardDetails(cardNumber, cardOwner, expirationDate, securityCode) {
        this.typeCardNumber(cardNumber);
        this.typeCardOwner(cardOwner);
        this.typeCardExpirationDate(expirationDate);
        this.typeSecurityCode(securityCode);
    }

    checkSaveCardCheckbox() {
        this.elements.saveCardCheckbox().check();
    }

    clickPayNowBtn(){
        this.elements.payNowBtn().click();
    }

    assertInvalidCardMessage(messageText) {
        this.elements.invalidCardErrorMessasge().should('contain', messageText);

    }

    //confirmation
    assertOrderConfirmationMessage() {
    //this.elements.orderConfirmationMessage().should('contain', messageText);
       assertElementContainsText(this.elements.orderConfirmationMessage(), 'Thank you for your order');
    }
    
    assertOrderNumberIsVisible() {
        assertElementContainsText(this.elements.orderConfirmationOrderNumber(), 'UK')
    }

    assertTotalOrderPrice(totalPrice){
        this.elements.orderTotalPrice().should('contain', totalPrice);
    }


    //ONO  STO ISKACE NAKON KUPOVINE cy.get('#WL_title')  Your order is complete:
    // cy.get('#WL_title', {timeout: 15000}).should('be.visible');


}

module.exports = new checkoutPage();