import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

import Contacts from './components/Contacts'
import Filter from './components/Filter'
import ContactForm from './components/Form'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')

	useEffect(() => {
		phonebookService
			.getAll()
			.then(initialContacts => {
				setPersons(initialContacts)
			})
	}, [])

	const addPerson = (event) => {
		event.preventDefault()

		if (persons.some(contact => contact.name === newName))
			alert(`${newName} is already added to phonebook`)
		else {
			const personObject = {
				name: newName,
				number: newNumber,
			}
			if (!personObject.name || !personObject.number)
				alert('Please provide name and number')
			else {
				phonebookService
				.create(personObject)
				.then(newPerson => {
					setPersons(persons.concat(newPerson))
					setNewName('')
					setNewNumber('')
				})
			}
		}
	}

	const removePerson = id => {
		const person = persons.find(person => person.id === id)
		if (window.confirm(`Do you want to remove ${person.name}`)) {
			phonebookService
			.remove(id)
			.then(returnedPerson => {
				setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
				setPersons(persons.filter(person => person.id !== id))
			})
			.catch(error => {
				alert(`Contact ${person.name} has been already removed`)
				setPersons(persons.filter(person => person.id !== id))
			})
		}
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
			<Contacts personsToShow={personsToShow} removePerson={removePerson}/>
		</div>
	)
}

export default App