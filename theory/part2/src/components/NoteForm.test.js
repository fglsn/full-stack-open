import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
	const createNote = jest.fn()
	const user = userEvent.setup()

	// const { container } = render(<NoteForm createNote={createNote} />)
	// const input = container.querySelector('#note-input')

	render(<NoteForm createNote={createNote} />)
	const input = screen.getByPlaceholderText('write note content here')
	const sendButton = screen.getByText('save')

	await user.type(input, 'testing a form...')
	await user.click(sendButton)

	expect(createNote.mock.calls).toHaveLength(1)
	expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})

// // For multiple input fields (returnes array, relies on the order of the input fields)
//const inputs = screen.getAllByRole('textbox')
//await user.type(inputs[0], 'testing a form...')

// // One input field, not nhe best practice
// const input = screen.getByRole('textbox')

// // If we want to look for an element that contains the text:
//const element = screen.getByText('Does not work anymore :(', { exact: false })
//const element = await screen.findByText('Does not work anymore :(') // returns a pormise

