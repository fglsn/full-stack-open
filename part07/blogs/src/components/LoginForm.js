import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { login } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
// import blogService from '../services/blogs'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(login(username, password))
	}

	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={handleSubmit}>

				<div>
					<TextField
						id='username'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
						label="username" />
				</div>
				<div>
					<TextField
						id='password'
						type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						label="password" />
				</div>
				<div>
					<Button variant="contained" color="primary" type="submit">
						login
					</Button>
				</div>
			</form>
		</div>
	)
}

export default LoginForm