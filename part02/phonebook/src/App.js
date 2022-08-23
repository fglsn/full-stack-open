import { useState, useEffect } from 'react'
import axios from 'axios'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import ContactForm from './components/Form'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')

	const hook = () => {
		console.log('effect')
		axios
		  .get('http://localhost:3001/persons')
		  .then(response => {
			console.log('promise fulfilled')
			setPersons(response.data)
		  })
	  }
	
	  useEffect(hook, [])

	const addPerson = (event) => {
		event.preventDefault()
		if (persons.some(contact => contact.name === newName))
			alert(`${newName} is already added to phonebook`)
		else {
			const personObject = {
				id: persons.length + 1,
				name: newName,
				number: newNumber,
			}
			if (!personObject.name || !personObject.number)
				alert('Please provide name and number')
			else
				setPersons(persons.concat(personObject))
		}
		setNewName('')
		setNewNumber('')
	}

	let personsToShow = [];

	if(search) {
		let searchMatches = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
		if (searchMatches.length)
			personsToShow = searchMatches
		else
			personsToShow = [];
	}
	else
		personsToShow = persons

	const handleNewNameChange = (event) => setNewName(event.target.value)
	const handleNewNumberChange = (event) => setNewNumber(event.target.value)
	const handleNewSearch = (event) => setSearch(event.target.value)

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter search={search} handleNewSearch={handleNewSearch}/>
			<h3>Add new contact</h3>
			<ContactForm addPerson={addPerson} newNameHandler={handleNewNameChange} newNumberHandler={handleNewNumberChange} newName={newName} newNumber={newNumber}/> 
			<h2>Numbers</h2>
			<Contacts personsToShow={personsToShow}/>
		</div>
	)
}

export default App