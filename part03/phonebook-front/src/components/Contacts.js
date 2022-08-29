import React from 'react'

const Contacts = ({ personsToShow, removePerson }) => {
	return (
		<ul>
			{personsToShow.map(person => 
				<Contact key={person.name} person={person} removePerson={removePerson}/>
			)}
		</ul>
	)
}

const Contact = ({ person, removePerson }) => {
	return (
		<li>{person.name}: {person.number}
			<button onClick={() => removePerson(person.id)}>remove contact</button></li>
	)
}

export default Contacts