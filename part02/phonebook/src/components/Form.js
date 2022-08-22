import React from "react"

const ContactForm = ({addPerson, newName, newNameHandler, newNumber, newNumberHandler}) => {
	return (
		<form onSubmit={addPerson}>
		<div>
			<div>name: <input value={newName} onChange={newNameHandler}/></div>
			<div>number: <input value={newNumber} onChange={newNumberHandler}/></div>
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
	)
}

export default ContactForm