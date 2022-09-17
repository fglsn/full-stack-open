import { useState } from 'react'
import Button from "./Button"
import '../index.css'

const Blog = ({ blog }) => {

	const [expand, setExpand] = useState(false)

	const hideWhenExpanded = { display: expand ? 'none' : '' }
	const showWhenExpanded = { display: expand ? '' : 'none' }

	const handleExpand = () => {
		setExpand(!expand)
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
				<div> likes {blog.likes} <Button text='like'></Button></div>
				<div>{blog.author}</div>
			</div>
		</div>
	)
}
export default Blog