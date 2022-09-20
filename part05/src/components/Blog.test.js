import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

const blog = {
	title: 'Some title',
	author: 'Bella Bebs',
	url: 'bebs.com',
	likes: 100
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
	})

	test('blog object expanded on click of Expand btn', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('Expand')
		await user.click(button)

		const expanded = container.querySelector('.blog-expanded')
		expect(expanded).not.toHaveStyle('display: none')
	})

})
