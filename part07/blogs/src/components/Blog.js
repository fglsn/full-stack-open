import { useDispatch, useSelector } from 'react-redux'
import { like } from '../reducers/blogReducer'
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

let style = {
	header: {
		margin: '15px'
	},
	box: {
		margin: '2rem'
	},
	card: {
		minWidth: 275,
	}
}



const Blog = ({ blog }) => {
	if (!blog) {
		console.log('not blog, returning')
		return null
	}

	const blogs = useSelector(({ blogs }) => blogs)
	const dispatch = useDispatch()

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
						<Link>{blog.url}</Link>
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
		</Box>
	)
}

export default Blog