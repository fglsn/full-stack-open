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
		})

		it('a blog can be created', function () {
			cy.createBlog({ title: 'new title', author: 'best author', url: '123.com' })
			cy.contains('"new title" by best author')
		})

		it('user can like a blog', function () {
			cy.createBlog({ title: 'new title', author: 'best author', url: '123.com' })
			cy.contains('"new title" by best author')
			cy.contains('Expand').click()
			cy.contains('like').click()
			cy.contains('likes: 1')
		})

		it('user can remove his post', function () {
			cy.createBlog({ title: 'new title', author: 'best author', url: '123.com' })
			cy.contains('"new title" by best author')
			cy.contains('Expand').click()
			cy.contains('Remove').click()

			cy.get('html').should('not.contain', '"new title" by best author')
		})

		it.only('user can not remove other users posts', function () {
			cy.login({ username: 'ilona', name: 'ilona', password: '123' })
			cy.createBlog({ title: 'new title', author: 'best author', url: '123.com' })
			cy.contains('Logout').click()

			cy.login({ username: 'bebs', name: 'bebs', password: '123' })
			cy.contains('"new title" by best author')
			cy.contains('Expand').click()
			cy.get('html').should('not.contain', 'Remove')
		})
	})

})