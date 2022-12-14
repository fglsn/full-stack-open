import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import User from './components/User'
import Users from './components/Users'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Footer from './components/Footer'


import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'

import {
	Box,
	Button,
	AppBar,
	Toolbar,
	Typography
} from '@mui/material'

import {
	Routes,
	Route,
	Link,
	Navigate,
} from 'react-router-dom'

let style = {
	header: {
		textAlign: 'center',
		margin: '15px',
		color: 'rgb(58, 118, 204)'
	},
	container: {
		margin: '2rem'
	},
}

const App = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	const handleLogout = async (event) => {
		event.preventDefault()
		window.localStorage.clear()
		dispatch(setLoggedUser(null))
		dispatch(setNotification('Logged out', 5))
	}

	const user = useSelector(({ loggedUser }) => loggedUser)
	if (user)
		blogService.setToken(user.token)

	const blogs = useSelector(({ blogs }) => blogs)

	return (
		<Box>
			<AppBar position="static">
				<Toolbar>
					<Button color="inherit" component={Link} to="/">blogs</Button>
					<Button color="inherit" component={Link} to="/users">users</Button>
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
			<Notification />
			<Typography style={style.header} variant="h3">BlogsApp</Typography>
			<Routes>
				<Route path="/" element={<BlogList />} />
				<Route path="/blogs" element={<BlogList />} />
				<Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
				<Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
				<Route path="/users/:id" element={user ? <User /> : <Navigate replace to="/login" />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
			<Footer/>
		</Box>
	)
}

export default App
