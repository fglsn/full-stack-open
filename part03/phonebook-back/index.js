require("dotenv").config();

const express = require("express")
const morgan = require("morgan")
const cors = require('cors')

const app = express()
const Person = require('./models/person');

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())
// app.use(morgan("tiny"));
morgan.token('body', (req, resp) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response) => {
	Person.find({}).then(persons => {
		const personsCount = persons.length
		const timestamp = new Date()
		// console.log(personsCount)
		if (personsCount === 1)
			response.send(`Phonebook har records for 1 person`)
		else
			response.send(`<p>Phonebook har records for ${personsCount} people</p>
							<p>${timestamp}</p>`)
	})
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
  })

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person)
				response.json(person)
			else
				response.status(404).end()
		})
		.catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (body.name ===  undefined || body.number === undefined) {
		return response.status(400).json({ error: 'missing name or/and number' })
	} else if (Person.find({name: body.name})) {
		console.log('error: that name is already in the phonebook')
		return response.status(400).json({ error: 'that name is already in the phonebook' })
	}

	const person = new Person({
		name: body.name,
		number: body.number
	})

	person.save()
		.then(savedPerson => {
			response.json(savedPerson)
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body

	Person.findByIdAndUpdate(
		request.params.id,
		{ name, number },
		{ new: true, runValidators: true, context: 'query' }
	)
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
	.then(result => {
		response.status(204).end()
	})
	.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})