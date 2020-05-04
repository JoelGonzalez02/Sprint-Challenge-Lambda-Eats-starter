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


})