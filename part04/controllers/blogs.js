const blogsRouter = require('express').Router()
//  const { request, response } = require('express')

const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {

	const body = request.body
	const user = request.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	})

	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
	const body = request.body
	const user = request.user

	const userId = user._id
	// console.log('USER: ', creatorId.toString())

	const blog = await Blog.findById(request.params.id)
	// console.log('BLOG USER ID', blog.user)
	if (blog.user.toString() === userId.toString()) {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	} else {
		return response.status(401).json({ error: 'user not authorized to remove post (not owner)' })
	}
})

module.exports = blogsRouter