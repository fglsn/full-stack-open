import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Button from './components/Button'

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
	const blogFormRef = useRef()

	useEffect(() => {
		setSortedList()
	}, [])

	const setSortedList = async () => {
		const upToDateBlogs = await blogService.getAll()
		upToDateBlogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
		setBlogs(upToDateBlogs)
	}

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

	const addBlog = async blogObject => {
		// hide the form by calling noteFormRef.current.toggleVisibility() after a new note has been created
		blogFormRef.current.toggleVisibility()

		const newBlog = await blogService.create(blogObject)
		console.log('new blog: ', JSON.stringify(newBlog))
		if (newBlog.error) {
			// console.log(newBlog.error)
			displayError(newBlog.error)
		} else {
			await setSortedList()
			displayInfo(`a new blog ${newBlog.title} by ${newBlog.author} is added`)
		}
	}

	const handleLike = async (blog) => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		const response = await blogService.putLike(updatedBlog)

		if (response.error)
			console.log(response.error)
		else {
			await setSortedList()
			// console.log("like added")
		}
	}

	const handleRemove = async () => {
		let confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
		if (confirm) {
			await blogService.remove(blog.id)
			await setSortedList()
		}
	}

	const blogForm = () => (
		<Togglable buttonLabel="New blog" ref={blogFormRef}>
			<BlogForm
				createBlog={addBlog}
			/>
		</Togglable>
	)

	return (

		<div>
			<Notification error={errorMessage} info={infoMessage} />

			{	//if user not logged in, show login form, otherwise full content
				user === null ?
					<Togglable buttonLabel='login'>
						<LoginForm
							username={username}
							password={password}
							handleUsernameChange={({ target }) => setUsername(target.value)}
							handlePasswordChange={({ target }) => setPassword(target.value)}
							handleSubmit={handleLogin}
						/>
					</Togglable> :
					<div>
						<p>{user.name} logged in
							<Button onClick={handleLogout} text='Logout'></Button>
						</p>
						{blogForm()}
					</div>
			}
			<div>
				<h2>Blog list: </h2>

				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} onLike={handleLike} onRemoveBlog={handleRemove} user={user} />
				)}
			</div>
		</div>
	)
}

export default App
