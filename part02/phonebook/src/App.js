import { useState } from 'react'

const Contact = ({ person }) => {
	return (
		<li>{person.name}</li>
	)
}

const App = (props) => {
	const [persons, setPersons] = useState(props.persons)
	const [newName, setNewName] = useState('')

	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
		}
		setPersons(persons.concat(personObject))
		setNewName('')
	}

	const handleNewNameChange = (event) => setNewName(event.target.value)

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNewNameChange}/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			{/* <div>debug: {newName}</div> */}
			<h2>Numbers</h2>
			<ul>
				{persons.map(person => 
					<Contact key={person.name} person={person}/>
				)}
			</ul>
		</div>
	)
}

export default App