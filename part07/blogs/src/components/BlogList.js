// import User from './User'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import {
	Box,
	List,
	ListItemButton,
	ListItemText,
	Divider,
	Typography,
} from '@mui/material'

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
		minHeight: '100vh',
	},
}

const BlogList = () => {
	const blogs = useSelector(({ blogs }) => blogs)
	return (
		<Box style={style.box}>
			<h2 style={style.header}>Blogs</h2>
			<List sx={style.list} component="nav" aria-label="blogs">
				{blogs.map((blog) => {
					const blogTitle = `"${blog.title}" by ${blog.author}`
					return (
						<Typography key={blog.id} component={'span'}>
							<ListItemButton>
								<Link to={`/blogs/${blog.id}`}>
									<ListItemText primary={blogTitle} />
								</Link>
							</ListItemButton>
							<Divider />
						</Typography>
					)
				})}
			</List>
		</Box>
	)
}

export default BlogList
