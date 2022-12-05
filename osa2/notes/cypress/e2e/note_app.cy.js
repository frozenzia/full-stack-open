describe('Note ', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:5001/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:5001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
    })

    it('login form can be opened', function() {
        cy.contains('log in').click()
        cy.get('#username').type('mluukkai')
        cy.get('input[name="Password"]').type('salainen')
        cy.get('#loginButton').click()

        cy.contains('Matti Luukkainen logged in')
    })

    it('login fails with wrong password', function() {
        cy.contains('log in').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#loginButton').click()

        cy.get('.error')
            .should('contain', 'wrong creds')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        describe('and several notes exist', function () {
            beforeEach(function () {
                cy.createNote({ content: 'first note', date: new Date().toISOString(), important: false })
                cy.createNote({ content: 'second note', date: new Date().toISOString(), important: false })
                cy.createNote({ content: 'third note', date: new Date().toISOString(), important: false })
            })

            it('it can be made important', function () {
                cy.contains('second note').parent().find('#toggleImportanceButton').as('theButton')
                cy.get('@theButton').click()
                cy.get('@theButton').should('contain', 'make not important')
            })
        })

        it('a new note can be created', function() {
            cy.contains('new note').click()
            cy.get('#noteInput').type('a note created by cypress')
            cy.get('#saveNoteButton').click()
            cy.contains('a note created by cypress')
        })

    })
})