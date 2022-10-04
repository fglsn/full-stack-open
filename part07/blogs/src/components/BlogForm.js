import { TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Container } from '@mui/system'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'

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

const BlogForm = () => {
	const title = useField('text', 'title')
	const author = useField('text', 'author')
	const url = useField('text', 'url')

	const dispatch = useDispatch()

	const handleSubmit = (event) => {
		event.preventDefault()
		const newBlog = { title: title.value, author: author.value, url: url.value }
		if (title.value.length && url.value.length)
			dispatch(createBlog(newBlog))
		else
			dispatch(setNotification('Error: Please fill title and url fields', 5))
	}

	const handleReset = (event) => {
		event.preventDefault()
		title.onChange(event)
		author.onChange(event)
		url.onChange(event)
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
				<Button onClick={(e) => handleReset(e)}>reset</Button>
			</form>
		</Container>
	)
}

export default BlogForm
