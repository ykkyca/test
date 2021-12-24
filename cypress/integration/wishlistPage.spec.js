/// <reference types="cypress" />

import { validatePageTitleContains, waitPageToLoad, assertTextIsVisible, validatePageTitle } from "./commonFunctions";
import { navigateToPDP } from "../pages/commons";
import pdpPage from "../pages/pdpPage";
import wishlistPage from "../pages/wishlistPage"
//import wishlistPage, { assertQuantity } from "../pages/wishlistPage";
import accountPage from "../pages/accountPage";


describe('check wishlist functionalities', () => {

    beforeEach(function () {
            cy.
                login(this.data.validEmail, this.data.validPass);
            validatePageTitle
                (this.data.accountPageTitle);
            assertTextIsVisible
                (accountPage.elements.welcomeMessage(), this.data.welcomeMessage);
        })


     afterEach(function() {
        wishlistPage.navigate();
        waitPageToLoad('/wishlist');
        cy.get('body').then(($body) => {
            if ($body.text().includes(this.products.itemNameA) ||
                $body.text().includes(this.products.itemNameB) ||
                $body.text().includes(this.products.itemNameC)) {
                wishlistPage.deleteWishlistItem();
                wishlistPage.assertWishlistEmptyState(
                    this.wishlist.emptyStateTitle,
                    this.wishlist.emptyStateMessage,
                    this.wishlist.emptyStateBtn);
            }
        })
    })


    it('verify adding an item to wishlist', function () {
        navigateToPDP(this.products.itemShortSkuA);
        pdpPage.selectColour(this.products.itemColourA);
        pdpPage.selectSize(this.products.itemSizeA);
        pdpPage.clickAddToWishListIcon();
        wishlistPage.navigate();

        validatePageTitleContains
            (this.wishlist.title);
        wishlistPage.
            assertItemInWishlist(
                this.products.itemNameA,
                this.products.itemSkuA,
                this.products.itemColourA,
                this.products.itemSizeA,
                '1',
                this.products.itemPriceA);

    })

    it('verify modifying an item in the wishlist: edit quantity', function () {
        navigateToPDP(this.products.itemShortSkuB);
        pdpPage.selectColour(this.products.itemColourB);
        waitPageToLoad('color=');
        pdpPage.selectSize(this.products.itemSizeB);

        pdpPage.clickAddToWishListIcon();
        wishlistPage.navigate();

        validatePageTitleContains
            (this.wishlist.title);
        wishlistPage.
            assertItemInWishlist(
                this.products.itemNameB,
                this.products.itemSkuB,
                this.products.itemColourB,
                this.products.itemSizeB,
                '1',
                this.products.itemPriceB);
        wishlistPage.modifyQuantity(this.products.itemNewQuantity);

        wishlistPage.
            assertQuantity(this.products.itemNewQuantity);

    })

    it('verify removing an item from wishlist after quantity modification', function () {
        //add, modify quantity and remove
        navigateToPDP(this.products.itemShortSkuC);
        pdpPage.selectColour(this.products.itemColourC);
        pdpPage.selectSize(this.products.itemSizeC);

        pdpPage.clickAddToWishListIcon();
        wishlistPage.navigate();

        validatePageTitleContains
            (this.wishlist.title);
        wishlistPage.
            assertItemInWishlist(
                this.products.itemNameC,
                this.products.itemSkuC,
                this.products.itemColourC,
                this.products.itemSizeC,
                '1',
                this.products.itemPriceC);

        wishlistPage.modifyQuantity(this.products.itemNewQuantity);

        wishlistPage.
            assertQuantity(this.products.itemNewQuantity);

        wishlistPage.deleteWishlistItem();
        wishlistPage.
            assertWishlistEmptyState(
                this.wishlist.emptyStateTitle,
                this.wishlist.emptyStateMessage,
                this.wishlist.emptyStateBtn);

    })



})