/// <reference types="cypress" />


describe('Ztech Automation', () => {
    before('Launch url',()=>{
        cy.visit("https://react-shopping-cart-67954.firebaseapp.com/")
        // to view the url you visited on the report
        cy.url().then(value =>{
            cy.log('your url is:', value)
        })
    })

    it('should sort items from lowest to highest price', ()=>{
        cy.get('select').select('lowestprice')
        cy.get('.val') .then($prices => {
            // remove "$" from prices and convert to strings
            const prices = $prices
              .toArray()
              .map($el => parseFloat($el.innerText.substr(1)))
            // assertion comes from chai-sorted
            cy.wrap(prices).should('equal', prices.sort(function (a, b) { return a - b }))
            console.log('sorting order:', prices.sort(function (a, b) { return a - b }));
          })
    })

    it('should sort items from highest to lowest price', ()=>{
        cy.get('select').select('highestprice')
        cy.get('.val') .then($prices => {
            // remove "$" from prices and convert to strings
            const prices = $prices
              .toArray()
              .map($el => parseFloat($el.innerText.substr(1)))
            // assertion comes from chai-sorted
            cy.wrap(prices).should('equal', prices.sort(function (a, b) { return b - a }))
          })
    })

    it('should add items to the cart', ()=>{
      cy.get('select').select('Select')
        //adding items to chat
        cy.get(".shelf-item__thumb").eq(3).click()
        cy.get('.float-cart__close-btn').click()
        cy.get(".shelf-item__thumb").eq(1).click()
        cy.get('.float-cart__close-btn').click()
        //asserting number of items added
        cy.get('.bag__quantity').eq(0).should('have.text', '2')
    })

    it('should add to the quantity of a selected item by clicking on the plus icon', ()=>{
      cy.get('.bag__quantity').eq(0).click()
      cy.get('.change-product-button').eq(1).click()
      // asserting the quantity of the selected item in the cart
      cy.get('.desc').eq(0).should('contain', 'Quantity: 2')
      cy.get('.float-cart__close-btn').click()
    })

    it('should reduce the quantity of a selected item by clicking the minus botton', ()=>{
      cy.get('.bag__quantity').eq(0).click()
      cy.get('.change-product-button').eq(0).click()
      // asserting the quantity of the selected item in the cart
      cy.get('.desc').eq(0).should('contain', 'Quantity: 1')
      cy.get('.float-cart__close-btn').click()
    })

    it('should return a correct calculation of the sum of the selected items in the cart', ()=>{
      // emptying the cart
      cy.get('.bag__quantity').eq(0).click()
      cy.get('.shelf-item__del').eq(0).click()
      cy.get('.shelf-item__del').eq(0).click()
      cy.get('.float-cart__close-btn').click()
      // adding  items to the cart
      cy.get(".shelf-item__thumb").eq(3).click()
      cy.get('.float-cart__close-btn').click()
      cy.get(".shelf-item__thumb").eq(1).click()
      // asseting the total amount o
      cy.get('.sub-price__val').should('have.text','$ 43.45')
      cy.get('.float-cart__close-btn').click()
    })

    it('should remove items from the cart', ()=>{
      cy.get('.bag__quantity').eq(0).click()
      cy.get('.shelf-item__del').eq(1).click()
      // asseting that the item was removed from the cart
      cy.get('.shelf-item__del').eq(1).should('not.exist')
      cy.get('.float-cart__close-btn').click()
    })

    it('should display item based on the selected size', ()=> {
      cy.get('.checkmark').eq(0).click()
      cy.get('.shelf-item__title').eq(0).should('be.visible')
      cy.get('.checkmark').eq(0).click()
    })

    it('should checkout items on the cart', ()=>{
      cy.get('.bag__quantity').eq(0).click()
      cy.get('.buy-btn').click()
      cy.wait(1000)
      cy.get('.float-cart__close-btn').click()
    })

})