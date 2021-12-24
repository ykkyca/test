/// <reference types="cypress" />

describe('visual validations', () => {

    beforeEach(()=> {

        cy.eyesOpen({
            appName: 'UK Boohoo dev', batchName: 'Visual check',
            browser: [
                { name: 'chrome', width: 1024, height: 768 },
            //     { name: 'chrome', width: 1980, height: 1080 },
               // { deviceName: 'iPhone X' }

            ]
        });

    })


    it('1. login page- visual validation', function () {
        cy.visit('/login');
        cy.wait(3000);

        cy.eyesCheckWindow('1. Login page');

    })



    // it('2. wishlist empty state- visual validation', function () {
    //     cy.visit('/wishlist');
    //     cy.wait(3000);

    //     cy.eyesCheckWindow('2. Wishlist empty state')
    // })

    // it('3. bag empty state- visual validation', function () {
    //     cy.visit('/cart');
    //     cy.wait(3000);

    //     cy.eyesCheckWindow('Wishlist empty state')
    // })


    afterEach(() =>  {
        cy.eyesClose();
    })

})