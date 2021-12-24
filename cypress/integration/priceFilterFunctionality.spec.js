/// <reference types="cypress" />

import wCoatsAJacketsPage from "../pages/wCoatsAJacketsPage";
import commons from "../pages/commons";
import { waitPageToLoad, assertPriceFilter } from "./commonFunctions";



describe('Check price filters funtionalities', () => {

    //checks price sorting on womens coats and jackets

    beforeEach(() => {
        wCoatsAJacketsPage.navigateToWomanCoatsAndJackets();
        commons.clickPriceFilter();
    })

    it('verify price under £ 5 filter', () => {
        commons.filterByPrice('under £ 5');
        waitPageToLoad('?pmin=0&pmax=5');

        assertPriceFilter
            (wCoatsAJacketsPage.elements.itemPriceList(), 0.00, 5.01);
    })

    it('verify price £5 - £15 filter', () => {
        commons.filterByPrice('£5 - £15');
        waitPageToLoad('pmin=5&pmax=15');

        assertPriceFilter
            (wCoatsAJacketsPage.elements.itemPriceList(), 4.99, 15.01);
    })

    it('verify price £15 - £30 filter', () => {
        commons.filterByPrice('£15 - £30');
        waitPageToLoad('?pmin=15&pmax=30');

        assertPriceFilter
            (wCoatsAJacketsPage.elements.itemPriceList(), 14.99, 30.01);
    })

    it('verify price £30 - £50 filter', () => {
        commons.filterByPrice('£30 - £50');
        waitPageToLoad('?pmin=30&pmax=50');

        assertPriceFilter
            (wCoatsAJacketsPage.elements.itemPriceList(), 29.99, 50.01);
    })

    it('verify price £50 - £200 filter', () => {
        commons.filterByPrice('£50 - £200');
        waitPageToLoad('?pmin=50&pmax=200');

        assertPriceFilter
            (wCoatsAJacketsPage.elements.itemPriceList(), 49.99, 200.01);
    })



})






