import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

const blog = {
	title: 'Some title',
	author: 'Bella Bebs',
	url: 'bebs.com',
	likes: 60,
	user: {
		username: 'test',
		name: 'testname testsurname',
		id: '123'
	},
	id: '12345'
}

const user = {
	username: 'test',
	name: 'testname testsurname',
	blogs: [
		{
			title: 'Some title',
			author: 'Bella Bebs',
			url: 'bebs.com',
			likes: '60',
			id: '12345'
		},
		{
			title: 'This title is the best',
			author: 'Tamara Berns',
			url: '123.com',
			likes: 32,
			id: '12346'
		}
	],
	id: '123'
}

describe('render content', () => {
	let container

	beforeEach(() => {
		container = render(
			<Blog blog={blog}></Blog>
		).container
	})

	test('initially renders only title and author', () => {
		const collapsed = container.querySelector('.blog-collapsed-title')

		expect(collapsed).toHaveTextContent('"Some title" by Bella Bebs')
		expect(collapsed).toHaveStyle('display: block')

		const expanded = container.querySelector('.blog-expanded')
		expect(expanded).toHaveStyle('display: none')

		expect(screen.queryByText(`url: ${blog.url}`)).not.toBeVisible()
		expect(screen.queryByText(`likes: ${blog.likes}`)).not.toBeVisible()
	})

	test('blog object expanded on click of Expand btn', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('Expand')
		await user.click(button)

		// const expanded = container.querySelector('.blog-expanded')
		// expect(expanded).not.toHaveStyle('display: none')

		expect(screen.queryByText(`url: ${blog.url}`)).toBeVisible()
		expect(screen.queryByText(`likes: ${blog.likes}`)).toBeVisible()
	})

})


test('likes', async () => {
	const mockHandler = jest.fn()
	const userTest = userEvent.setup()

	render(<Blog blog={blog} onLike={mockHandler} user={user} />)

	const button = screen.getByLabelText('like-btn')

	await userTest.click(button)
	await userTest.click(button)
	expect(mockHandler.mock.calls).toHaveLength(2)

})