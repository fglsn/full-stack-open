import User from './User'
import { useSelector } from 'react-redux'

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	TableHead
} from '@mui/material'

const Users = () => {
	const users = useSelector(({ users }) => { return users })

	return (
		<div>
			<h2>Users</h2>
			<TableContainer sx={{ width: 650 }}component={Paper}>
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
									<User key={user.id} user={user}></User>
								</TableCell>
								<TableCell align="center">{user.blogs.length}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Users
