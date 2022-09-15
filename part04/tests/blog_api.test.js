const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

const { findById } = require('../models/blog')
const { response } = require('../app')

jest.setTimeout(100000)

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
	await User.deleteMany({})
	const passwordHash = await bcrypt.hash('xmaterials', 10)
	const user = new User({ username: 'kuki', passwordHash })

	await user.save()
})

describe('when there is initially some posts saved', () => {

	test('all blog posts are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('blog posts are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('identifier property of the blog posts is named id', async () => {
		const response = await api.get('/api/blogs')
		for (let blog of response.body)
			expect(blog.id).toBeDefined()
	})

})

describe('adding new blog with post', () => {

	test('new valid post can be added', async () => {

		const user = helper.loginUser

		const newBlog = {
			title: 'New blog by Bebes Bebesovitch',
			author: 'Bebes Bebesovitch',
			url: 'https://bebsbloggis.com/',
			likes: 0
		}

		const response = await api
			.post('/api/login')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const body = response.body
		// console.log(token.token)

		await api
			.post('/api/blogs')
			.set({ Authorization: `bearer ${body.token}` })
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		//check if amount of elements in db increased by 1
		const blogsAfterPostRequest = await helper.blogsInDb()
		expect(blogsAfterPostRequest).toHaveLength(helper.initialBlogs.length + 1)

		//check if new post can be found in db
		const blogsTitles = blogsAfterPostRequest.map(blog => blog.title)
		expect(blogsTitles).toContain('New blog by Bebes Bebesovitch')
	})

	test('missing likes property defaulted to 0', async () => {
		const user = helper.loginUser

		const response = await api
		.post('/api/login')
		.send(user)
		.expect(200)
		.expect('Content-Type', /application\/json/)

		const body = response.body

		const newBlog = {
			title: 'Test default on likes: New blog by Bubis Bubisovitch',
			author: 'Bubis Bubisovitch',
			url: 'https://bubsbloggis.com/',
		}

		await api
			.post('/api/blogs')
			.set({ Authorization: `bearer ${body.token}` })
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsList = await helper.blogsInDb()
		const recentlyAdded = blogsList.filter(blog => blog.title === 'Test default on likes: New blog by Bubis Bubisovitch')
		// console.log(recentlyAdded[0])
		expect(recentlyAdded[0]).toHaveProperty('likes', 0)

		const blogsAfterPostRequest = await helper.blogsInDb()
		expect(blogsAfterPostRequest).toHaveLength(helper.initialBlogs.length + 1)
	})

	test('fails with 400 Bad Request on missing title and url', async () => {
		const user = helper.loginUser

		const response = await api
			.post('/api/login')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const body = response.body

		const newBlog = {
			author: 'Bubis Bubisovitch'
		}

		await api
			.post('/api/blogs', newBlog)
			.set({ Authorization: `bearer ${body.token}` })
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})

})

describe('updating an existing post', () => {

	test('post with existing id can be updated', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]
		// console.log(blogToUpdate)
		const contentToUpdate = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
		// console.log(contentToUpdate)
		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(contentToUpdate)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

		const updatedBlog = blogsAtEnd.find(blog => blog.title === 'React patterns')
		// console.log(updatedBlog)
		expect(updatedBlog).toEqual(contentToUpdate)
	})
})

describe('removing blog post', () => {

	test('deletion succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

		const titles = blogsAtEnd.map(blog => blog.title)
		expect(titles).not.toContain(blogToDelete.title)
	})
})