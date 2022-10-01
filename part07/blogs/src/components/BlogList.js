// import User from './User'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import {
	Box,
	List,
	ListItem,
	ListItemText,
	Divider,
} from '@mui/material'

let style = {
	header: {
		textAlign: 'center',
		margin: '15px'
	},
	list: {
		margin: '2rem',
	}
}

const BlogList = () => {
	const blogs = useSelector(({ blogs }) => blogs)
	return (
		<Box>
			<h2 style={style.header}>Blogs</h2>
			<List sx={style.list} component="nav" aria-label="blogs">
				{blogs.map(blog => {
					const blogTitle = `"${blog.title}" by ${blog.author}`
					return (
						<div key={blog.id}>
							<ListItem button>
								<Link to={`/blogs/${blog.id}`}>
									<ListItemText primary={blogTitle} />
								</Link>
							</ListItem>
							<Divider />
						</div>
					)
				}
				)}
			</List>
		</Box>
	)
}

export default BlogList