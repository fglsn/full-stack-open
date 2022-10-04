const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'Error: malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: 'Error: ' + error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'Error: invalid token'
		})
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({
			error: 'Error: token expired'
		})
	}

	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		const token = authorization.substring(7)
		// console.log(token)
		request.token = token
	}
	next()
}

const userExtractor = async (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken || !decodedToken.id) {
		return response.status(401).json({ error: 'Error: token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)
	if (!user) {
		return response.status(401).json({ error: 'Error: user not found' })
	}
	request.user = user
	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}