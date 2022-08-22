import React from 'react'

const Contacts = ({ personsToShow }) => {
	return (
		<ul>
			{personsToShow.map(person => 
				<Contact key={person.name} person={person}/>
			)}
		</ul>
	)
}

const Contact = ({ person }) => {
	return (
		<li>{person.name}: {person.number} </li>
	)
}

export default Contacts