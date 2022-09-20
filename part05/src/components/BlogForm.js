import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({ title, author, url })
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h2>Create new blog</h2>

			<form className='blogForm' onSubmit={addBlog}>
				<div className='input'>
					title
					<input
						type="text"
						value={title}
						name="Title"
						placeholder='Blog titile'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div className='input'>
					author
					<input
						type="text"
						value={author}
						name="Author"
						placeholder='Blog author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div className='input'>
					url
					<input
						type="text"
						value={url}
						name="Url"
						placeholder='Blog url'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button className='btn' type="submit">save</button>
			</form>
		</div>
	)
}

export default BlogForm