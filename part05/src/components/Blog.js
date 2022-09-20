import { useState } from 'react'
import Button from './Button'
import blogService from '../services/blogs'
import '../index.css'

const Blog = ({ blog, updateList, user }) => {

	const [expand, setExpand] = useState(false)

	const hideWhenExpanded = { display: expand ? 'none' : '' }
	const showWhenExpanded = { display: expand ? '' : 'none' }

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
				<p className='blogStyle'>
				&quot;{blog.title}&quot; by {blog.author}
					<button className='btn' onClick={handleExpand}>Expand</button>
				</p>
			</div>
			<div className='blogStyle' style={showWhenExpanded}>
				<div>
					{blog.title}
					<button className='btn' onClick={handleExpand}>Hide</button>
				</div>
				<div>{blog.url}</div>
				<div> likes {blog.likes} <Button text='like' onClick={incrementLike}></Button></div>
				<div>{blog.author}</div>
				{showRemoveBtn() && <Button text='Remove' onClick={removeBlog}></Button>}
			</div>
		</div>
	)
}
export default Blog