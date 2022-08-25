const express = require('express')
const app = express()

app.use(express.json())
let persons = [
	{
	  id: 1,
	  content: "HTML is easy",
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

app.get('/', (request, response) => {
	response.send('<a href="http://localhost:3001/api/persons">show persons</a>')
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
  })


const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})