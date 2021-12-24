/// <reference types="cypress" />

import bagPage from "../pages/bagPage";
import pdpPage from "../pages/pdpPage";
import accountPage from "../pages/accountPage";
import { waitPageToLoad, validatePageTitleContains, validatePageTitle, assertTextIsVisible } from "./commonFunctions";
import { navigateToPDP } from "../pages/commons";

describe('bag page functionalities', () => {

    beforeEach(function () {
        cy.
            login(this.data.validEmail, this.data.validPass);
        validatePageTitle
            (this.data.accountPageTitle);
        assertTextIsVisible
            (accountPage.elements.welcomeMessage(),
                this.data.welcomeMessage);

    })

    afterEach(function () {
        bagPage.navigate();
        waitPageToLoad('/cart');
        cy.get('body').then(($body) => {
            if ($body.text().includes(this.products.itemNameD)) {
                cy.intercept('/on/demandware.store/Sites-boohoo-UK-Site/en_GB/Cart-MiniCart?format=ajax').
                as('itemDeleted');
                bagPage.deleteBagItem();
                cy.wait('@itemDeleted');
                bagPage.assertBagEmptyState(
                    this.bag.emptyStateMessage,
                    this.bag.emptyStateBtn);
            }
        })
    })


    it('verify item can be added to bag', function () {
        navigateToPDP(this.products.itemShortSkuD);
        pdpPage.selectColour(this.products.itemColourD);
        pdpPage.selectSize(this.products.itemSizeD);
        pdpPage.clickAddToBagBtn();
        pdpPage.hoverMiniBagIcon();
        pdpPage.clickMiniBagViewBagBtn();
        waitPageToLoad('/cart');

        validatePageTitleContains
            (this.bag.title);
        bagPage.
            assertItemInBag(
                this.products.itemNameD,
                this.products.itemSkuD,
                this.products.itemColourD,
                this.products.itemSizeD,
                '1',
                this.products.itemPriceD,
                '3.00'
            );

    })

    it('verify item can be modified in bag: edit quantity', function () {
        navigateToPDP(this.products.itemShortSkuD);
        pdpPage.selectColour(this.products.itemColourD);
        pdpPage.selectSize(this.products.itemSizeD);
        pdpPage.clickAddToBagBtn();
        pdpPage.hoverMiniBagIcon();
        pdpPage.clickMiniBagViewBagBtn();
        waitPageToLoad('/cart');

        validatePageTitleContains
            (this.bag.title);
        bagPage.
            assertItemInBag(
                this.products.itemNameD,
                this.products.itemSkuD,
                this.products.itemColourD,
                this.products.itemSizeD,
                '1',
                this.products.itemPriceD,
                '3.00'
            );

        bagPage.modifyQuantity(this.products.itemNewQuantity);
        bagPage.
            assertQuantity(this.products.itemNewQuantity);
        bagPage.
            assertTotalPrice('24.00');



    })

    //add, edit quantity then delete
    it('verify item can be deleted from bag after quantity modification', function () {
        navigateToPDP(this.products.itemShortSkuD);
        pdpPage.selectColour(this.products.itemColourD);
        pdpPage.selectSize(this.products.itemSizeD);
        pdpPage.clickAddToBagBtn();
        pdpPage.hoverMiniBagIcon();
        pdpPage.clickMiniBagViewBagBtn();
        waitPageToLoad('/cart');

        validatePageTitleContains
            (this.bag.title);
        bagPage.
            assertItemInBag(
                this.products.itemNameD,
                this.products.itemSkuD,
                this.products.itemColourD,
                this.products.itemSizeD,
                '1',
                this.products.itemPriceD,
                '3.00'
            );

        bagPage.modifyQuantity(this.products.itemNewQuantityD);
        bagPage.
            assertQuantity(this.products.itemNewQuantityD);
        bagPage.
            assertTotalPrice('18.00');

        cy.intercept('/on/demandware.store/Sites-boohoo-UK-Site/en_GB/Cart-MiniCart?format=ajax').
            as('itemDeleted');
        bagPage.deleteBagItem();
        cy.wait('@itemDeleted');
        bagPage.
            assertBagEmptyState(
                this.bag.emptyStateMessage,
                this.bag.emptyStateBtn);

    })



})