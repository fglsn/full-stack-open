// const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

jest.setTimeout(100000)

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
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
		const newBlog = {
			title: 'New blog by Bebes Bebesovitch',
			author: 'Bebes Bebesovitch',
			url: 'https://bebsbloggis.com/',
			likes: 0
		}

		await api
			.post('/api/blogs')
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
		//default property equal to 0 added to likes in person.js model
		const newBlog = {
			title: 'Test default on likes: New blog by Bubis Bubisovitch',
			author: 'Bubis Bubisovitch',
			url: 'https://bubsbloggis.com/',
		}

		await api
			.post('/api/blogs')
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
		const newBlog = {
			author: 'Bubis Bubisovitch'
		}

		await api.post('/api/blogs', newBlog).expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
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