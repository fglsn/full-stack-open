import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import { initializeUsers } from './reducers/userReducer'

// import Footer from './components/Footer'

import blogService from './services/blogs'
import loginService from './services/login'

import {
	Button,
	AppBar,
	Toolbar
} from '@mui/material'

import {
	Routes,
	Route,
	Link,
	Navigate,
} from 'react-router-dom'

const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

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
		// const dispatch = useDispatch()
		// try {
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
		// } catch (exception) {
		// 	dispatch(setNotification('wrong username and password', 5))
		// }
	}

	const handleLogout = async (event) => {
		event.preventDefault()
		// try {
		window.localStorage.clear()
		setUser(null)
		window.location.href = '/'
		// } catch (exception) {
		// 	const dispatch = useDispatch()

		// 	dispatch(setNotification('Somehing went wrong during logout, please try again', 5))
		// }
	}

	return (
		<div>

			{/* {(message &&
				<Alert severity="success">
					{message}
				</Alert>
			)} */}
			<AppBar position="static">
				<Toolbar>
					<Button color="inherit" component={Link} to="/">
						blogs
					</Button>
					<Button color="inherit" component={Link} to="/users">
						users
					</Button>
					{user
						? <div>
							<em>{user.name} logged in </em>
							<Button onClick={handleLogout} color="inherit">Logout</Button>
						</div>
						: <Button color="inherit" component={Link} to="/login">
							login
						</Button>
					}
				</Toolbar>
			</AppBar>

			<Routes>
				<Route path="/" element={<Navigate replace to="/login" />} />
				{/* <Route path="/blogs" element={<BlogList />} />
				<Route path="/blogs/:id" element={<Blog blog={blog} />} /> */}
				<Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
				<Route path="/login" element={<LoginForm
					username={username}
					password={password}
					handleUsernameChange={({ target }) => setUsername(target.value)}
					handlePasswordChange={({ target }) => setPassword(target.value)}
					handleSubmit={handleLogin} />} />
			</Routes>
			{/* <Footer /> */}
		</div>
	)
}


export default App
