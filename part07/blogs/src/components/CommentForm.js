import { TextField, Button } from '@mui/material'
import { comment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Box, Container } from '@mui/system'
import { useFieldWithReset } from '../hooks/index'

let style = {
	input: {
		margin: '0 0 15px 0',
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
	},
}

const CommentForm = ({ blogs, blogId }) => {

	const dispatch = useDispatch()
	const { reset, ...commentText } = useFieldWithReset('text')
	const newComment = { content: commentText.value }

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(comment(blogs, blogId, newComment))
		reset('')
	}

	return (
		<Box style={style.box}>
			<Container style={style.container}>
				<h4 style={style.header}>Comment</h4>

				<form style={style.box} onSubmit={handleSubmit}>
					<TextField style={style.input} {...commentText} />
					<Button variant="contained" color="primary" type="submit">
						Comment
					</Button>
				</form>
			</Container>
		</Box>
	)
}

export default CommentForm
