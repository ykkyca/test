/// <reference types="cypress" />
import accountPage from "../pages/accountPage";
import loginPage from "../pages/loginPage";
import { assertTextIsVisible, validatePageTitle, validatePageTitleContains } from "./commonFunctions";

describe('Check login and logout functionalities', () => {


    it('validate user can log in', function () {
        cy.
            login(this.data.validEmail, this.data.validPass);

        validatePageTitle
            (this.data.accountPageTitle);
        assertTextIsVisible
            (accountPage.elements.welcomeMessage(), this.data.welcomeMessage);

    })

    it('validate user can log out', function () {
        cy.
            login(this.data.validEmail, this.data.validPass);

        validatePageTitle
            (this.data.accountPageTitle);
        assertTextIsVisible
            (accountPage.elements.welcomeMessage(), this.data.welcomeMessage);

        cy.
            logOut();

        validatePageTitleContains
            (this.data.loginPageTitle);
        assertTextIsVisible
            (loginPage.elements.pageHeader(), this.data.loginPageHeader);

    })


})

