import PropTypes from 'prop-types'
import { TextField, Button } from '@mui/material'
const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password
}) => {
	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<TextField
						id='username'
						value={username}
						onChange={handleUsernameChange}
						label="username" />
				</div>
				<div>
					<TextField
						id='password'
						type='password'
						value={password}
						onChange={handlePasswordChange}
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

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default LoginForm