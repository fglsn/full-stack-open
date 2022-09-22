describe('Blog app', function () {

	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')

		cy.createUser({ name: 'ilona', username: 'ilona', password: '123' })
		cy.createUser({ name: 'bebs', username: 'bebs', password: '123' })
	})

	it('Login button is shown', function () {
		cy.contains('login').click()
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('ilona')
			cy.get('#password').type('123')
			cy.get('#login-button').click()

			cy.contains('ilona logged in')
		})

		it('fails with wrong credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('wrong')
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'wrong username and password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')

			cy.get('html').should('not.contain', 'ilona logged in')
		})
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'ilona', password: '123' })
			cy.createBlog({ title: 'new title', author: 'best author', url: '123.com' })
		})

		it('a blog can be created', function () {
			cy.contains('"new title" by best author')
		})

		it('user can like a blog', function () {
			cy.contains('"new title" by best author')
			cy.contains('Expand').click()
			cy.contains('like').click()
			cy.contains('likes: 1')
		})

		it('user can remove his post', function () {
			cy.contains('"new title" by best author')
			cy.contains('Expand').click()
			cy.contains('Remove').click()

			cy.get('html').should('not.contain', '"new title" by best author')
		})

		it('user can not remove other users posts', function () {
			cy.contains('Logout').click()
			cy.login({ username: 'bebs', name: 'bebs', password: '123' })

			cy.contains('"new title" by best author')
			cy.contains('Expand').click()
			cy.get('html').should('not.contain', 'Remove')
		})

		it('blogs are ordered according to likes', function () {

			cy.createBlog({ title: 'second new title', author: 'second author', url: '123.com' })
			cy.createBlog({ title: 'third new title', author: 'third author', url: '123.com' })


			cy.get('.blog').eq(2).contains('Expand').click()
			cy.get('.blog').eq(2).contains('like').click({ timeout: 10000 })

			cy.get('.blog').eq(0).contains('Expand').click()
			cy.get('.blog').eq(0).contains('like').click({ timeout: 10000 })

			cy.get('.blog').eq(2).contains('Expand').click()
			cy.get('.blog').eq(2).contains('like').click({ timeout: 10000 })

			cy.get('.blog').eq(0).contains('Hide').click()
			cy.get('.blog').eq(1).contains('Hide').click()
			cy.get('.blog').eq(2).contains('Hide').click()

			cy.get('.blog').eq(0).should('contain', '"third new title" by third author')
			cy.get('.blog').eq(1).should('contain', '"second new title" by second author')
			cy.get('.blog').eq(2).should('contain', '"new title" by best author')

		})
	})
})

