/// <reference types="cypress" />

import bagPage from "../pages/bagPage";
import pdpPage from "../pages/pdpPage";
import checkoutPage from "../pages/checkoutPage";
import accountPage from "../pages/accountPage";
import { waitPageToLoad, validatePageTitleContains, validatePageTitle, assertTextIsVisible } from "./commonFunctions";
import { navigateToPDP } from "../pages/commons";

describe('Verify user can buy an item', () => {

    beforeEach(function () {

        cy.
            login(this.data.validEmail, this.data.validPass);
        validatePageTitle
            (this.data.accountPageTitle);
        assertTextIsVisible
            (accountPage.elements.welcomeMessage(), this.data.welcomeMessage);
        waitPageToLoad("/myaccount");
        navigateToPDP(this.products.itemShortSkuE);

        pdpPage.selectColour(this.products.itemColourE);
        waitPageToLoad('color=');
        pdpPage.selectSize(this.products.itemSizeE);
        pdpPage.clickAddToBagBtn();
        pdpPage.hoverMiniBagIcon();
        pdpPage.clickMiniBagViewBagBtn();
        waitPageToLoad('/cart');

        validatePageTitleContains
            (this.bag.title);
        bagPage.assertItemInBag(
            this.products.itemNameE,
            this.products.itemSkuE,
            this.products.itemColourE,
            this.products.itemSizeE,
            '1',
            this.products.itemPriceE,
            '15.00'
        );
    })



    afterEach(function () {
        bagPage.navigate();

        waitPageToLoad('/cart');
        cy.intercept('/on/demandware.store/Sites-boohoo-UK-Site/en_GB/Cart-MiniCart?format=ajax').
        as('itemDeleted');
        cy.get('body').then(($body) => {
            if ($body.text().includes(this.products.itemNameE)) {
                bagPage.deleteBagItem();
                cy.wait('@itemDeleted');
                bagPage.assertBagEmptyState(
                    this.bag.emptyStateMessage,
                    this.bag.emptyStateBtn
                );
            }
        })
    })


    it('verify item cannot be bought with invalid card', function () {
        bagPage.clickCheckoutBtn();
        checkoutPage.
            clickProceedToBillingBtn();

        cy.intercept(
            '/on/demandware.store/Sites-boohoo-UK-Site/en_GB/COBilling-SelectCreditCard?creditCardUUID=843bad8bb3648631450afc6012').
            as('cvcReady');

        checkoutPage.clickCardLabel();
        checkoutPage.selectExistingCard(this.creditCard.invalidSavedCreditCard);
        cy.wait('@cvcReady');
        checkoutPage.typeSecurityCode(this.creditCard.cvc);
        checkoutPage.clickPayNowBtn();

        checkoutPage.
            assertInvalidCardMessage(
                this.creditCard.transactionDeclinedMessage);

    })

    // buy with new card + uk standard delivery
    it('Verify user can buy an item while adding new card', function () {
        bagPage.clickCheckoutBtn();
        checkoutPage.clickUKStandardDeliveryCard();
        checkoutPage.clickProceedToBillingBtn();
        checkoutPage.clickCardLabel();
        checkoutPage.fillNewCardDetails(
            this.creditCard.number,
            this.creditCard.owner,
            this.creditCard.expirationDate,
            this.creditCard.cvc);
        checkoutPage.clickPayNowBtn();

        checkoutPage.assertOrderConfirmationMessage();
        checkoutPage.assertOrderNumberIsVisible();
        checkoutPage.assertTotalOrderPrice('18.99');


    })

    //already saved card + DPD delivery
    it('verify item can be bought with already saved Card', function () {
        bagPage.clickCheckoutBtn();
        checkoutPage.clickDpdDeliveryCard();
        checkoutPage.clickProceedToBillingBtn();

        cy.intercept(
            '/on/demandware.store/Sites-boohoo-UK-Site/en_GB/COBilling-SelectCreditCard?creditCardUUID=df0cf8fc3292d4608b00bca2e2').
            as('cvcReady');

        checkoutPage.clickCardLabel();
        checkoutPage.selectExistingCard(this.creditCard.validSavedCreditCard);

        cy.wait('@cvcReady');

        checkoutPage.typeSecurityCode(this.creditCard.cvc);
        checkoutPage.clickPayNowBtn();

        checkoutPage.assertOrderConfirmationMessage();
        checkoutPage.assertOrderNumberIsVisible();
        checkoutPage.assertTotalOrderPrice('20.99');

    })








})