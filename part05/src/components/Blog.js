import { useState } from 'react'
import Button from './Button'
import blogService from '../services/blogs'
import '../index.css'

const Blog = ({ blog, updateList, user }) => {

	const [expand, setExpand] = useState(false)

	const hideWhenExpanded = { display: expand ? 'none' : 'block' }
	const showWhenExpanded = { display: expand ? 'block' : 'none' }

	const handleExpand = () => {
		setExpand(!expand)
	}

	const incrementLike = async () => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		const response = await blogService.putLike(updatedBlog)
		if (response.error)
			console.log(response.error)
		else {
			updateList()
			// console.log("like added")
		}
	}

	const removeBlog = async () => {
		let confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
		if (confirm) {
			await blogService.remove(blog.id)
			updateList()
		}
	}

	const showRemoveBtn = () => {
		// if (user) {
		// 	console.log(blog.user)
		// 	console.log('logged in user', user.id)
		// }
		return user && user.id === blog.user.id
	}

	return (
		<div className='container' >
			<div className='container' style={hideWhenExpanded}>
				<div className='blogStyle'>
					<div className='blog-collapsed-title'>&quot;{blog.title}&quot; by {blog.author}</div>
					<button className='btn expand-btn' onClick={handleExpand}>Expand</button>
				</div>
			</div>
			<div className='blogStyle blog-expanded' style={showWhenExpanded}>
				<div>
					{blog.title}
				</div>
				<div>{blog.url}</div>
				<div>
					likes {blog.likes}
					<button className='btn' aria-label='like' onClick={incrementLike}>like</button>
				</div>
				<div>{blog.author}</div>
				{showRemoveBtn() && <Button text='Remove' onClick={removeBlog}></Button>}
			</div>
		</div>
	)
}
export default Blog