import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = jest.fn()
	const user = userEvent.setup()
	render(<BlogForm createBlog={createBlog} />)

	const titleInput = screen.getByPlaceholderText('Blog title')
	const authorInput = screen.getByPlaceholderText('Blog author')
	const urlInput = screen.getByPlaceholderText('Blog url')
	const sendButton = screen.getByText('save')

	await user.type(titleInput, 'test title')
	await user.type(authorInput, 'test author')
	await user.type(urlInput, 'test url')
	await user.click(sendButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0]).toEqual([{ title: 'test title', author: 'test author', url: 'test url' }])
	// console.log(createBlog.mock.calls)
})