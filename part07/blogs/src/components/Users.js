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
	Typography,
} from '@mui/material'

import { Link } from 'react-router-dom'

let style = {
	header: {
		textAlign: 'center',
		margin: '25px',
	},
	container: {
		margin: '2rem',
	},
	box: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}

const Users = () => {
	const users = useSelector(({ users }) => users)

	return (
		<Box style={style.box}>
			<Typography style={style.header} variant="h4">Users</Typography>
			<TableContainer sx={{ width: 650 }} component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">Name</TableCell>
							<TableCell align="center">Blogs created</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
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
