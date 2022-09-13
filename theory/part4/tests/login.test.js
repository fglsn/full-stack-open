const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

jest.setTimeout(100000)

describe('login related', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('logged in with right username & pwd', async () => {
		const loginParams = {
			username: 'root',
			password: 'sekret'
		}

		await api
			.post('/api/login')
			.send(loginParams)
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('failed to login on wrong credentials', async () => {
		const loginParams = {
			username: 'root',
			password: 'wrong'
		}

		await api
			.post('/api/login')
			.send(loginParams)
			.expect(401)
			.expect('Content-Type', /application\/json/)
	})

})