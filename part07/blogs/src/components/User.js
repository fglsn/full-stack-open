import { Link } from 'react-router-dom'

const User = ({ user }) => {
	return (
		<Link to={`/users/${user.id}`}>
			{user.name}
		</Link>
	)
}

export default User