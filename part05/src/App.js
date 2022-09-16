import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

//window.localStorage.clear()

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null)
	const [infoMessage, setInfoMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [blogs, setBlogs] = useState([])
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			displayError('wrong username and password')
		}
	}

	const handleLogout = async (event) => {
		event.preventDefault()
		try {
			window.localStorage.clear()
			setUser(null)
			window.location.href = '/'
		} catch (exception) {
			setErrorMessage('something wrong with logout try again')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)

	const displayError = (error) => {
		setErrorMessage(error)
		setTimeout(() => {
			setInfoMessage(null)
		}, 5000)
	}

	const displayInfo = (info) => {
		setInfoMessage(info)
		setTimeout(() => {
			setInfoMessage(null)
		}, 5000)
	}

	const addBlog = (event) => {
		event.preventDefault()
		const blogObject = { title, author, url }
		blogService
			.create(blogObject)
			.then(returnedBlog => {
				if (returnedBlog.error) {
					console.log(returnedBlog.error)
					displayError(returnedBlog.error)
				} else {
					setBlogs(blogs.concat(returnedBlog))
					setTitle('')
					setAuthor('')
					setUrl('')
					displayInfo(`a new blog ${returnedBlog.title} by ${returnedBlog.author} is added`)
				}
			})
	}

	const blogForm = () => (
		<form onSubmit={addBlog}>
			<div>
				title
				<input
					type="text"
					value={title}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author
				<input
					type="text"
					value={author}
					name="Author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url
				<input
					type="text"
					value={url}
					name="Url"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit">save</button>
		</form>
	)

	return (

		<div>
			<Notification error={errorMessage} info={infoMessage} />

			{
				//if user not logged in, show login form, otherwise full content
				user === null ?
					<div>
						<h2>Log in to application</h2>
						{loginForm()}
					</div> :
					<div>
						<p>{user.name} logged in
							<button onClick={handleLogout} type="submit">logout</button>
						</p>
						{blogForm()}
						<h2>blogs</h2>
						{blogs.map(blog =>
							<Blog key={blog.id} blog={blog} />
						)}
					</div>
			}
		</div>
	)
}

export default App
