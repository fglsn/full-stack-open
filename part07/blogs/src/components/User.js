import { Link } from 'react-router-dom'

const User = ({ user }) => {
	if (!user) {
		return null
	}
	return (
		<Link to={`/users/${user.id}`}>
			{user.name}
		</Link>
	)
}

export default User