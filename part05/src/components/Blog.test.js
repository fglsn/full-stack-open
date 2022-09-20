import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Blog from './Blog'

test('renders only title and author', () => {
	const blog = {
		title: 'Some title',
		author: 'Bella Bebs',
		url: 'bebs.com',
		likes: 100
	}

	const { container } = render(<Blog blog={blog}></Blog>)

	const collapsed = container.querySelector('.blog-collapsed-title')
	expect(collapsed).toHaveTextContent('"Some title" by Bella Bebs')
	expect(collapsed).toHaveStyle('display: block')

	const expanded = container.querySelector('.blog-expanded')
	expect(expanded).toHaveStyle('display: none')
})
