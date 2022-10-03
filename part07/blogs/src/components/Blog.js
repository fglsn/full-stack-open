import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { like } from '../reducers/blogReducer'
import Comments from './Comments'
// import { setNotification } from '../reducers/notificationReducer'


import {
	Box,
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	Link
} from '@mui/material'
import CommentForm from './CommentForm'

let style = {
	header: {
		margin: '15px'
	},
	box: {
		margin: '2rem'
	},
	card: {
		minWidth: 275
	}
}

const Blog = () => {
	const dispatch = useDispatch()
	const blogs = useSelector(({ blogs }) => blogs)
	const match = useMatch('/blogs/:id')

	const blog = match
		? blogs.find(blog => blog.id === match.params.id)
		: null
	if (!blog) {
		return null
	}

	const handleLike = async (blogs, blog) => {
		dispatch(like(blogs, blog.id))
		// dispatch(setNotification(`like added to '${blog.title}'`, 5))
	}

	return (
		<Box style={style.box}>
			<Card sx={style.card}>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Blog title
					</Typography>
					<Typography sx={{ mb: 1 }} variant="h5" component="div">
						{blog.title}
					</Typography>
					<Typography sx={{ mb: 1 }} color="text.secondary">
						<Link href={blog.url}>{blog.url}</Link>
					</Typography>
					<Typography variant="body2">
						by {blog.author}
					</Typography>
				</CardContent>
				<CardActions>
					<Typography variant="body2">
						{blog.likes} likes
					</Typography>
					<Button size="small" onClick={() => handleLike(blogs, blog)}>Like</Button>
				</CardActions>
			</Card>
			<CommentForm blogs={blogs} blogId={blog.id} />
			<Comments comments={blog.comments}/>
		</Box>
	)
}

export default Blog