require("dotenv").config();

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Note = require('./models/note')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('body', (req, resp) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let notes = [
	{
	  id: 1,
	  content: "HTML",
	  date: "2022-05-30T17:30:31.098Z",
	  important: true
	},
	{
	  id: 2,
	  content: "Browser can execute only Javascript",
	  date: "2022-05-30T18:39:34.091Z",
	  important: false
	},
	{
	  id: 3,
	  content: "GET and POST are the most important methods of HTTP protocol",
	  date: "2022-05-30T19:20:14.298Z",
	  important: true
	}
  ]

  const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
  }
  app.use(requestLogger)

  app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
	Note.find({}).then(notes => {
	  response.json(notes)
	})
  })

  app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = notes.find(note => note.id === id)
	note &&
		response.json(note)
	!note &&
		response.status(404).end()
  })

  app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	notes = notes.filter(note => note.id !== id)
	response.status(204).end()
  })

  const generateId = () => {
	const maxId = notes.length > 0
	? Math.max(...notes.map(note => note.id))
	: 0
	return maxId + 1
  }

  app.post('/api/notes', (request, response) => {
	const body = request.body
	if (!body.content) {
		return response.status(400).json({
			error: 'missing content'
		})
	}

	const note = {
		content: body.content,
		important: body.important || false,
		date: new Date(),
		id: generateId(),
	}

	notes.concat(note)
	// console.log(note)
	// console.log(request.headers)
	response.json(note)
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
  })
