import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { login } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { Box, Container } from '@mui/system'
// import blogService from '../services/blogs'

let style = {
	input: {
		margin: '0 0 15px 0'
	},
	header: {
		textAlign: 'center',
		margin: '15px'
	},
	container: {
		margin: '2rem'
	},
	box: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minHeight: '100vh',
	}
}

const useField = (type, label) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		label,
		value,
		onChange,
	}
}

const LoginForm = () => {

	const username = useField('text', 'username')
	const password = useField('text', 'password')

	const dispatch = useDispatch()

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(login(username.value, password.value))
	}

	return (
		<Container style={style.container} >
			<h2 style={style.header}>Login</h2>

			<form onSubmit={handleSubmit}>
				<Box style={style.box}>
					<TextField style={style.input} {...username} />
					<TextField style={style.input} {...password} />
					<Button variant="contained" color="primary" type="submit">
						login
					</Button>
				</Box>
			</form>
		</Container>
	)
}

export default LoginForm