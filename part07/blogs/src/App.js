import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import { initializeUsers } from './reducers/userReducer'
import { setLoggedUser } from './reducers/loginReducer'

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
	useMatch,
} from 'react-router-dom'

const App = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	const handleLogout = async (event) => {
		event.preventDefault()
		window.localStorage.clear()
		dispatch(setLoggedUser(null))
		window.location.href = '/'
		//dispatch(setNotification('Somehing went wrong during logout, please try again', 5))
	}

	const user = useSelector(({ loggedUser }) => loggedUser)
	const blogs = useSelector(({ blogs }) => blogs)

	const match = useMatch('/blogs/:id')

	const blog = match
		? blogs.find(blog => blog.id === match.params.id)
		: null

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
			<h2>Blogs App</h2>
			<Routes>
				<Route path="/" element={<Navigate replace to="/blogs" />} />
				<Route path="/blogs" element={<BlogList />} />
				<Route path="/blogs/:id" element={<Blog blog={blog} />} />
				<Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
			{/* <Footer /> */}
		</div>
	)
}


export default App
