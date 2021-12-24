
class addressPage {

    elements = {
        addNewAddressBtn: () => cy.get('.address-create'),
        firstNameField: () => cy.get('#dwfrm_profile_address_firstname'),
        lastNameField: () => cy.get('#dwfrm_profile_address_lastname'),
        addressField: () => cy.get('#dwfrm_profile_address_address1'),
        cityField: () => cy.get('#dwfrm_profile_address_city'),
        postalCodeField: () => cy.get('#dwfrm_profile_address_postalcodes_postal'),
        phoneNumberField: () => cy.get('#dwfrm_profile_address_phone'),
        addressNicknameField: () => cy.get('#dwfrm_profile_address_addressid'),
        saveBtn: () => cy.get('.apply-button'),
        useOriginalAddressBtn: () => cy.get('.verification-address-button'),

    }

    navigate() {
        cy.visit('https://uk-dwdev.boohoo.com/addresses');
    }
    
    clickAddNewAddressBtn() {
        this.elements.addNewAddressBtn().click();
    }

    //new address interactions
    fillFirstNameField(firstname) {
        this.elements.firstNameField().type(firstname);
    }

    fillLastNameField(lastname) {
        this.elements.lastNameField().type(lastname);
    }

    fillAddressField(address) {
        this.elements.addressField().type(address);
    }

    fillCityField(city) {
        this.elements.cityField().type(city);

    }

    fillPostalCodeField(postalCode) {
        this.elements.postalCodeField().type(postalCode);
    }

    fillPhoneNumberField(phoneNumber) {
        this.elements.phoneNumberField().type(phoneNumber);
    }

    fillAddressNicknameField(addressNickname) {
        this.elements.addressNicknameField().type(addressNickname);
    }

    clickSaveBtn() {
        this.elements.saveBtn().click();
    }

    clickUseOriginalAddressBtn() {
        this.elements.useOriginalAddressBtn().click();
    }

    fillMandatoryFields(firstName, lastName, address, city, postalCode, phoneNumber, nickname) {
        this.fillFirstNameField(firstName);
        this.fillLastNameField(lastName);
        this.fillAddressField(address);
        this.fillCityField(city);
        this.fillPostalCodeField(postalCode);
        this.fillPhoneNumberField(phoneNumber);
        this.fillAddressNicknameField(nickname);
    }

 

    assertAddressIsVisible(firstName, lastName, address, city, postalCode, phoneNumber, nickname) {
        cy.contains(firstName).should('be.visible');
        cy.contains(lastName).should('be.visible');
        cy.contains(address).should('be.visible');
        cy.contains(city).should('be.visible');
        cy.contains(postalCode).should('be.visible');
        cy.contains(phoneNumber).should('be.visible');
        cy.contains(nickname).should('be.visible'); 

    }

    assertAddressIsNotVisible(firstName, lastName, address, city, postalCode, phoneNumber, nickname) {
        cy.contains(firstName).should('not.exist');
        cy.contains(lastName).should('not.exist');
        cy.contains(address).should('not.exist');
        cy.contains(city).should('not.exist');
        cy.contains(postalCode).should('not.exist');
        cy.contains(phoneNumber).should('not.exist');
        cy.contains(nickname).should('not.exist'); 

    }
    
    deleteAddress(nickname) {
        cy.
            get(`[href="/on/demandware.store/Sites-boohoo-UK-Site/en_GB/Address-Delete?AddressID=${nickname}"]`).
            click();


    }


}

module.exports = new addressPage();