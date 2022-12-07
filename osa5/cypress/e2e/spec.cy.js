describe('Blog app', function() {
    const testUser = {
        name: 'Test Tester',
        username: 'tester',
        password: 'testing123'
    }
    const visitingUser = {
        name: 'Veera Visitor',
        username: 'visitor',
        password: 'visiting123'
    }

    beforeEach(function() {
        cy.request('POST', 'http://localhost:5003/api/testing/reset')
        // create test and visiting user
        cy.request('POST', 'http://localhost:5003/api/users', testUser)
        cy.request('POST', 'http://localhost:5003/api/users', visitingUser)
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
            title: 'give me 1 like so I am second',
            author: 'C.S. Lewis',
            url: 'navigate.this'
        }
        const blog2 = {
            title: 'give me 0 likes so I am last',
            author: 'Huey Lewis',
            url: 'navigate.that'
        }
        const blog3 = {
            title: 'give me 2 likes so I am first in list',
            author: 'And the News',
            url: 'navigate.and.the.other'
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
            cy.get('@blogDiv').find('[data-cy="showHideBlog"]').click()
            cy.get('@blogDiv').find('.likesPlusLikeButton').as('theLikes')
            cy.get('@theLikes').find('[data-cy="likeTotal"]').as('likeValue')
            cy.get('@theLikes').find('.likeButton').as('theButton')

            cy.get('@likeValue').then(($span) => {
                const origLikes = parseInt($span.text(), 10)
                console.log('origLikes: ', { value: origLikes })
                cy.get('@theButton').click()
                cy.get('@likeValue').should(($span2) => {
                    const newLikes = parseInt($span2.text(), 10)
                    console.log('newLikes: ', { value: newLikes })
                    expect(newLikes).to.eq(origLikes + 1)
                })
            })
        })

        it('Test blog can be deleted if created by signed-in user', function() {
            cy.createBlog(testBlog)
            cy.contains(`${testBlog.title} ${testBlog.author}`).parent().as('blogDiv')
            cy.get('@blogDiv').find('[data-cy="removeButton"]').click()
            cy.get('html').should('not.contain', `${testBlog.title} ${testBlog.author}`)
        })

        it('Test blog can NOT be deleted if NOT created by signed-in user', function() {
            cy.createBlog(testBlog)
            cy.get('[data-cy="logoutButton"]').click()
            cy.login(visitingUser)
            cy.contains(`${testBlog.title} ${testBlog.author}`).parent().as('blogDiv')
            cy.get('@blogDiv').find('[data-cy="removeButton"]').should('be.hidden')
            cy.get('@blogDiv').find('[data-cy="removeButton"]').click({ force: true })
            cy.on('window:confirm', () => true)
            cy.get('.notice.fail')
                .should('contain', 'removing this blog failed')
            cy.contains(`${testBlog.title} ${testBlog.author}`)
        })

        it('Blogs are ordered by number of likes, in descending order', function() {
            cy.createBlog(testBlog) // like 1 time
            cy.createBlog(blog2) // like 0
            cy.createBlog(blog3) // like 2 times

            // first assert the blogs are in order of creation...
            cy.get('[data-cy="blog"]').eq(0).should('contain', testBlog.title).as('testBlog')
            cy.get('[data-cy="blog"]').eq(1).should('contain', blog2.title).as('blog2')
            cy.get('[data-cy="blog"]').eq(2).should('contain', blog3.title).as('blog3')

            // make blog3 and testBlog visible
            cy.get('@blog3').find('[data-cy="showHideBlog"]').click()
            cy.get('@testBlog').find('[data-cy="showHideBlog"]').click()

            // assign aliases for blog3 and testBlog likeTotals
            cy.get('@blog3').find('[data-cy="likeTotal"]').as('blog3Likes')
            cy.get('@testBlog').find('[data-cy="likeTotal"]').as('testBlogLikes')

            // like blog3 twice, testBlog once
            cy.get('@blog3').find('[data-cy="likeButton"]').click()
                .get('@blog3Likes').should(($span) => {
                    const likes = $span.text()
                    expect(likes).to.eq('1')
                })
            cy.get('@testBlog').find('[data-cy="likeButton"]').click()
                .get('@testBlogLikes').should(($span) => {
                    const likes = $span.text()
                    expect(likes).to.eq('1')
                })
            cy.get('@blog3').find('[data-cy="likeButton"]').click()
                .get('@blog3Likes').should(($span) => {
                    const likes = $span.text()
                    expect(likes).to.eq('2')
                })

            // assert the blogs are in the desired order...
            cy.get('[data-cy="blog"]').eq(0).should('contain', blog3.title)
            cy.get('[data-cy="blog"]').eq(1).should('contain', testBlog.title)
            cy.get('[data-cy="blog"]').eq(2).should('contain', blog2.title)

        })

    })
})