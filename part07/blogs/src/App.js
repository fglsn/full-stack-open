import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import { initializeUsers } from './reducers/userReducer'
import { setLoggedUser } from './reducers/loginReducer'


// import Footer from './components/Footer'

// import blogService from './services/blogs'
// import loginService from './services/login'

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

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setLoggedUser(user))
		}
	}, [dispatch])

	const handleLogout = async (event) => {
		event.preventDefault()
		window.localStorage.clear()
		dispatch(setLoggedUser(null))
		window.location.href = '/'
		//dispatch(setNotification('Somehing went wrong during logout, please try again', 5))
	}

	let user = localStorage.getItem('loggedBlogappUser')
		? localStorage.getItem('loggedBlogappUser')
		: null

	if (user)
		user = JSON.parse(user)

	useEffect(() => {
		dispatch(setLoggedUser(user))
	}, [])

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
				<Route path="/login" element={<LoginForm />} />
			</Routes>
			{/* <Footer /> */}
		</div>
	)
}


export default App
