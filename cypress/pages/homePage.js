/// <reference types="cypress" />


class homePage {

    elements =  {
        acceptAllbtn: () => cy.get('.js-accept-all-button'),
        closePremier: () => cy.get('.js-welcome-popup-close'),
        wishlistIcon: () => cy.get('.header-wishlist [title="Wish List"]')
           
    }
    
    navigate() {
        cy.visit("/");
    }

    
    acceptCookies() {
        this.elements.acceptAllbtn().click();
    }
    
    dismissPremier(){
        this.elements.closePremier().click();      
    }

    clickWishlistIcon(){
        this.elements.wishlistIcon().click();
    }
    
    
    }
    
    module.exports = new homePage();

    
