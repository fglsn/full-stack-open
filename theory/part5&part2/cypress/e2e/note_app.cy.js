describe('Note app', function () {

	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'ilona',
			username: 'ilo',
			password: '1'
		}
		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', function () {
		cy.contains('Notes')
		cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
	})

	it('login form can be opened', function () {
		cy.contains('login').click()
	})

	it('user can login', function () {
		cy.contains('login').click()
		cy.get('#username').type('ilo')
		cy.get('#password').type('1')
		cy.get('#login-button').click()

		cy.contains('ilona logged in')
	})

	it('login fails with wrong password', function () {
		cy.contains('login').click()
		cy.get('#username').type('ilo')
		cy.get('#password').type('wrong')
		cy.get('#login-button').click()

		// cy.get('.error').contains('wrong credentials')
		cy.get('.error')
			.should('contain', 'wrong credentials')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
			.and('have.css', 'border-style', 'solid')

		cy.get('html').should('not.contain', 'ilona logged in')

	})

	describe('when logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'ilo', password: '1' })
		})

		it('note can be added', function () {
			cy.contains('new note').click()
			cy.get('input').type('a note created by cypress')
			cy.contains('save').click()
			cy.contains('a note created by cypress')
		})

		describe('and several notes exist', function () {
			beforeEach(function () {
				cy.createNote({ content: 'first note', important: false })
				cy.createNote({ content: 'second note', important: false })
				cy.createNote({ content: 'third note', important: false })
			})

			it('one of those notes can be made important', function () {
				cy.contains('second note').parent().find('button').as('theButton')
				cy.get('@theButton').click()
				cy.get('@theButton').should('contain', 'make not important')
			})
		})
	})

	it('then example', function () {
		cy.get('button').then(buttons => {
			console.log('number of buttons', buttons.length)
			cy.wrap(buttons[0]).click()
		})
	})
})