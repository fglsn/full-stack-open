// import User from './User'
import { useSelector } from 'react-redux'

import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	TableHead,
} from '@mui/material'

import {
	Link
} from 'react-router-dom'

let style = {
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

const Users = () => {
	const users = useSelector(({ users }) => users)

	return (
		<Box style={style.box}>
			<h2 style={style.header}>Users</h2>
			<TableContainer sx={{ width: 650 }} component={Paper}>
				<Table >
					<TableHead>
						<TableRow>
							<TableCell align="center">Name</TableCell>
							<TableCell align="center">Blogs created</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user => (
							<TableRow key={user.id}>
								<TableCell align="center">
									<Link key={user.id} to={`/users/${user.id}`}>
										{user.name}
									</Link>
								</TableCell>
								<TableCell align="center">{user.blogs.length}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default Users
