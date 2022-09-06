import { useState, useEffect } from 'react'

import phonebookService from './services/phonebook'

import Contacts from './components/Contacts'
import Filter from './components/Filter'
import ContactForm from './components/Form'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')
	const [notification, setNotification] = useState(null)
	const [error, setError] = useState(null)


	useEffect(() => {
		phonebookService
			.getAll()
			.then(initialContacts => {
				setPersons(initialContacts)
			})
	}, [])

	const addPerson = (event) => {
		event.preventDefault()

		if (persons.some(contact => contact.name === newName)) {
			const person = persons.find(person => person.name === newName)
			if (window.confirm(`${newName} is already added to phonebook, do you want to replace number with the new one?`))
				changeNumber(person.id, newNumber)
		}
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
					setNotification(
						`${newPerson.name} is added to the contact list`
					)
					setTimeout(() => {
						setNotification(null)
					}, 5000)
					setNewName('')
					setNewNumber('')
				})
				.catch(error => {
					console.log(error.response.data.error)
					setError(error.response.data.error)
					setTimeout(() => {
						setError(null)
					}, 5000)
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
				// alert(`Contact ${person.name} has been already removed`)
				setError(`Contact ${person.name} has been already removed`)
				setTimeout(() => {
					setError(null)
				}, 5000)
				setNewName('')
				setNewNumber('')
				setPersons(persons.filter(person => person.id !== id))
			})
		}
	}

	const changeNumber = (id, newNumber) => {
		const person = persons.find(person => person.id === id)
		const changedPerson = { ...person, number: newNumber }

		phonebookService
			.update(id, changedPerson)
			.then(returnedPerson => {
				setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
			})
			.catch(error => {
				if (error.response.data.error) {
					let err = error.response.data.error
					if (err.indexOf('Validation failed:') !== -1) {
						console.log(error.response.data.error)
						setError(error.response.data.error)
						setTimeout(() => {
							setError(null)
						}, 5000)
					}
				} else {
					setError(`Contact ${person.name} has been already removed`)
					setTimeout(() => {
						setError(null)
					}, 5000)
					setPersons(persons.filter(person => person.id !== id))
				}

			})
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
			<Notification message={notification} />
			<ContactForm addPerson={addPerson} newNameHandler={handleNewNameChange} newNumberHandler={handleNewNumberChange} newName={newName} newNumber={newNumber}/> 
			<h2>Numbers</h2>
			<Contacts personsToShow={personsToShow} removePerson={removePerson}/>
			<Error message={error} />
		</div>
	)
}

export default App