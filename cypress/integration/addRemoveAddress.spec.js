/// <reference types="cypress" />

import accountPage from "../pages/accountPage";
import addressPage from "../pages/addressPage";
import { validatePageTitle, assertTextIsVisible, waitPageToLoad } from "./commonFunctions";

describe('check address functionalities', () => {


    beforeEach(function () {
            cy.
                login(this.data.validEmail, this.data.validPass);
            validatePageTitle
                (this.data.accountPageTitle);
            assertTextIsVisible
                (accountPage.elements.welcomeMessage(), this.data.welcomeMessage);

            accountPage.clickAddressLink();
            addressPage.clickAddNewAddressBtn();

    })
 
    afterEach(function() {
        addressPage.navigate();
        waitPageToLoad('/addresses');
        cy.get('body').then(($body) => {
            if ($body.text().includes(this.address.address)) {
                addressPage.deleteAddress(this.address.nickname);
                addressPage.assertAddressIsNotVisible(
                    this.address.firstName,
                    this.address.lastName,
                    this.address.address,
                    this.address.city,
                    this.address.zipCode,
                    this.address.phoneNumber,
                    this.address.nickname,
                    
                )
            }
        })
    })

    it('verify adding new address', function () {

        addressPage.fillMandatoryFields(
            this.address.firstName,
            this.address.lastName,
            this.address.address,
            this.address.city,
            this.address.zipCode,
            this.address.phoneNumber,
            this.address.nickname
        )

        addressPage.clickSaveBtn();

        addressPage.assertAddressIsVisible(
            this.address.firstName,
            this.address.lastName,
            this.address.address,
            this.address.city,
            this.address.zipCode,
            this.address.phoneNumber,
            this.address.nickname
        )

    })

    it('verify deleting existing address', function () {
        addressPage.fillMandatoryFields(
            this.address.firstNameB,
            this.address.lastNameB,
            this.address.addressB,
            this.address.cityB,
            this.address.zipCodeB,
            this.address.phoneNumberB,
            this.address.nicknameB
        )
        addressPage.clickSaveBtn();

        addressPage.assertAddressIsVisible(
            this.address.firstNameB,
            this.address.lastNameB,
            this.address.addressB,
            this.address.cityB,
            this.address.zipCodeB,
            this.address.phoneNumberB,
            this.address.nicknameB
        )

        addressPage.deleteAddress(this.address.nicknameB);

        addressPage.assertAddressIsNotVisible(
            this.address.firstNameB,
            this.address.lastNameB,
            this.address.addressB,
            this.address.cityB,
            this.address.zipCodeB,
            this.address.phoneNumberB,
            this.address.nicknameB,
            
        )



    })
})