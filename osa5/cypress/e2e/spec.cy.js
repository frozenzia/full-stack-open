describe('Blog app', function() {
    const testUser = {
        name: 'Test Tester',
        username: 'tester',
        password: 'testing123'
    }

    beforeEach(function() {
        cy.request('POST', 'http://localhost:5003/api/testing/reset')
        // create test user
        cy.request('POST', 'http://localhost:5003/api/users', testUser)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        console.log('testUser: ', { value: testUser })
        cy.get('html')
            .should('contain', 'log in to application')
            .and('contain', 'username')
            .and('contain', 'password')
            .and('contain', 'login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('input[name="Username"]').type(testUser.username)
            cy.get('input[name="Password"]').type(testUser.password)
            cy.get('button').click()

            cy.contains(`${testUser.name} logged in`)
        })

        it('fails with wrong credentials', function() {
            cy.get('input[name="Username"]').type(testUser.username)
            cy.get('input[name="Password"]').type('bogus')
            cy.get('button').click()

            cy.get('.notice.fail')
                .should('contain', 'wrong creds')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', `${testUser.name} logged in`)
        })
    })

    describe('When logged in', function() {
        const testBlog = {
            title: 'test blog title',
            author: 'C.S. Lewis',
            url: 'navigate.this'
        }

        beforeEach(function() {
            cy.login(testUser) // this sends 1 extra value (name) that's not needed, but that's ok!
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('input[name="Title"]').type(testBlog.title)
            cy.get('input[name="Author"]').type(testBlog.author)
            cy.get('input[name="Url"]').type(testBlog.url)
            cy.get('#createBlogButton').click()

            cy.get('html').should('contain', testBlog.title).and('contain', testBlog.author)
        })

        it('Test blog can be liked', function() {
            cy.createBlog(testBlog)
            cy.contains(`${testBlog.title} ${testBlog.author}`).parent().as('blogDiv')
            cy.get('@blogDiv').find('#toggleVisibilityButton').click()
            cy.get('@blogDiv').find('.likesPlusLikeButton').as('theLikes')
            cy.get('@theLikes').find('#likeTotal').as('likeValue')
            cy.get('@theLikes').find('.likeButton').as('theButton')

            cy.get('@likeValue').invoke('text').then(parseFloat)
                .then((origLikes) => {
                    cy.get('@theButton').click()
                    cy.get('@likeValue').invoke('text').then(parseFloat)
                        .then((newLikes) => {
                            expect(newLikes).to.eq(origLikes + 1)
                        })
                })
        })
    })
})