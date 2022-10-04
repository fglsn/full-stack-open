// import User from './User'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setBlogs } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'


import {
	Box,
	List,
	ListItemButton,
	ListItem,
	Divider,
	Typography,
	IconButton,
	ListItemText
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

let style = {
	header: {
		textAlign: 'center',
		margin: '15px',
	},
	list: {
		margin: '2rem',
	},
	box: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}

const BlogList = () => {
	const dispatch = useDispatch()

	const user = useSelector(({ loggedUser }) => loggedUser)
	const blogs = useSelector(({ blogs }) => blogs)

	const handleRemove = async (blog) => {
		let confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
		if (confirm) {
			await blogService.remove(blog.id)
			const blogs = await blogService.getAll()
			dispatch(setBlogs(blogs))
		}
	}

	return (
		<Box style={style.box}>
			{user ? <BlogForm /> : <br />}
			<h2 style={style.header}>Blogs</h2>
			<List sx={style.list} component="nav" aria-label="blogs">
				{blogs.map((blog) => {
					const author = blog.author ? `by ${blog.author}` : ''
					const blogTitle = `"${blog.title}" ${author}`
					return (
						<Typography key={blog.id} component={'span'}>
							<ListItemButton>
								<ListItem key={blog.id}
									secondaryAction={(user && user.id === blog.user.id) ?
										<IconButton edge="end" aria-label="delete" onClick={() => handleRemove(blog)}>
											<DeleteIcon />
										</IconButton>
										: <br />
									}
								>
									<Link to={`/blogs/${blog.id}`}>
										<ListItemText primary={blogTitle} />
									</Link>
								</ListItem>
							</ListItemButton>
							<Divider />
						</Typography>
					)
				})}</List>
		</Box>
	)
}

export default BlogList
