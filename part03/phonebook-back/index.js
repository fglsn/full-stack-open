const express = require("express")
const morgan = require("morgan")
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// app.use(morgan("tiny"));
morgan.token('body', (req, resp) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
	{ 
	"id": 1,
	"name": "Arto Hellas", 
	"number": "040-123456"
	},
	{ 
	"id": 2,
	"name": "Ada Lovelace", 
	"number": "39-44-5323523"
	},
	{ 
	"id": 3,
	"name": "Dan Abramov", 
	"number": "12-43-234345"
	},
	{ 
	"id": 4,
	"name": "Mary Poppendieck", 
	"number": "39-23-6423122"
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


// app.get('/', (request, response) => {
// 	response.send('<a href="">show persons</a>')
// })

app.get('/info', (request, response) => {
	const personsCount = persons.length
	const timestamp = new Date()
	// console.log(personsCount)
	if (personsCount === 1)
		response.send(`Phonebook har records for 1 person`)
	else
		response.send(`<p>Phonebook har records for ${personsCount} people</p>
						<p>${timestamp}</p>`)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	person = persons.find(person => person.id === id)
	person &&
		response.json(person)
	!person &&
		response.status(404).end()

})

function getRandomInt(min, max) {
	min = Math.floor(min);
	max = Math.ceil(max);
	return Math.ceil(Math.random() * (max - min + 1) + min);
}

const generateId = () => Math.floor(Math.random() * Number(2147483647))

const assignId = () => {
	let newId = generateId()
	let person = persons.find(person => person.id === newId)
	if (person || !newId)
		return (assignId()) 
	return (newId)
}

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'missing name or/and number'
		})
	} else if (persons.find(person => person.name === body.name)) {
		return response.status(400).json({
			error: 'name must be unique'
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: assignId()
	}
	// console.log(person.id)
	persons.concat(person)
	response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)
	response.status(204).end()
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})