/* global cy */

describe('Tests Form', function(){
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })


describe('Name Input', function(){
    it('types text into the name input', function(){
        cy.get('[data-cy= name]').type('Joel Gonzalez')
    })
})

describe('Test checkbox', function(){
    it('Tests that you can select multiple toppings', function(){
        cy.get('[data-cy= pepperoni]').check().should('be.checked')
        cy.get('[data-cy= sausage]').check().should('be.checked')
        cy.get('[data-cy= bacon]').check().should('be.checked')
        cy.get('[data-cy= olives]').check().should('be.checked')
    })
})

describe('Submit Button', function(){
    it('submits the form', function(){
        cy.get('form').submit()
    })
})

})