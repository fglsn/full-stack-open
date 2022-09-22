import { useState } from 'react'
import Button from './Button'
import '../index.css'

const Blog = ({ blog, onLike, onRemoveBlog, user }) => {

	const [expand, setExpand] = useState(false)

	const hideWhenExpanded = { display: expand ? 'none' : 'block' }
	const showWhenExpanded = { display: expand ? 'block' : 'none' }

	const handleExpand = () => setExpand(!expand)

	const showRemoveBtn = () => user && user.id === blog.user.id

	return (
		<div className='container blog'>
			<div className='container' style={hideWhenExpanded}>
				<div className='blogStyle'>
					<div className='blog-collapsed-title'>&quot;{blog.title}&quot; by {blog.author}</div>
					<button className='btn expand-btn' onClick={handleExpand}>Expand</button>
				</div>
			</div>
			<div className='blogStyle blog-expanded' style={showWhenExpanded}>
				<div>
					title: {blog.title}
					<button className='btn' onClick={handleExpand}>Hide</button>
				</div>
				<div>url: {blog.url}</div>
				<div>
					likes: {blog.likes}
					<button className='btn' aria-label='like-btn' onClick={() => onLike(blog)}>like</button>
				</div>
				<div>author: {blog.author}</div>
				{showRemoveBtn() && <Button text='Remove' onClick={() => onRemoveBlog(blog)}></Button>}
			</div>
		</div>
	)
}
export default Blog