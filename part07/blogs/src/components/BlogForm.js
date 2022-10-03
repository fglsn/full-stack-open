import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { createBlog } from '../reducers/blogReducer'

let style = {
	input: {
		margin: '0 0 15px 0',
		width: '25rem'
	},
	header: {
		textAlign: 'center',
		margin: '15px',
	},
	container: {
		margin: '2rem',
	},
	box: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: '2rem'
	},
}

const useField = (type, label) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		label,
		value,
		onChange,
	}
}

const BlogForm = () => {
	const title = useField('text', 'title')
	const author = useField('text', 'author')
	const url = useField('text', 'url')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()
		const newBlog = { title: title.value, author: author.value, url: url.value }
		// console.log(newBlog)
		dispatch(createBlog(newBlog))
		navigate('/')
	}

	return (
		<Container>
			<h3 style={style.header}>Add new blog</h3>

			<form style={style.box} onSubmit={handleSubmit}>
				<TextField size='small' style={style.input} {...title} />
				<TextField size='small' style={style.input} {...author} />
				<TextField size='small' style={style.input} {...url} />
				<Button variant="contained" color="primary" type="submit">
					add blog
				</Button>
			</form>
		</Container>
	)
}

export default BlogForm
