/// <reference types="cypress" />

class loginPage {

    elements =  {
        emailInput: () => cy.contains('Email Address'),
        passwordInput: () => cy.contains('Password'),
        loginBtn: () => cy.get('button[value="log in securely"]'),
        errorInvalidCredentials: () => cy.get('.js-login-response'),
        pageHeader: () => cy.get('.login-title')  
    }

    
    navigate() {
        cy.visit('/login');
    }
    typeEmail(email) {
        this.elements.emailInput().type(email);
    }
    
    typePassword(password) {
        this.elements.passwordInput().type(password);
    }
    
    clickLoginBtn() {
        this.elements.loginBtn().click();
    }
    
    

}

module.exports = new loginPage();