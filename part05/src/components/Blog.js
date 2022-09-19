import { useState } from 'react'
import Button from "./Button"
import blogService from '../services/blogs'
import '../index.css'

const Blog = ({ blog, updateList }) => {

	const [expand, setExpand] = useState(false)

	const hideWhenExpanded = { display: expand ? 'none' : '' }
	const showWhenExpanded = { display: expand ? '' : 'none' }

	const handleExpand = () => {
		setExpand(!expand)
	}

	const incrementLike = () => {
		let changedBlog = blog
		changedBlog.likes += 1
		blogService
			.putLike(changedBlog)
			.then(returnedBlog => {
				if (returnedBlog.error)
					console.log(returnedBlog.error)
				else {
					console.log("like added")
				}
			})
			updateList()
	}

	return (
		<div className='container' >
			<div className='container' style={hideWhenExpanded}>
				<p className='blogStyle'>"
					{blog.title}" by {blog.author} 
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
			</div>
		</div>
	)
}
export default Blog