import {
	useMatch,
	Link
} from 'react-router-dom'

import { useSelector } from 'react-redux'

import {
	Box,
	Card,
	CardHeader,
	CardContent,
	Typography,
	Avatar,
	List,
	ListSubheader,
	ListItemButton,
} from '@mui/material'

import { red } from '@mui/material/colors'

let style = {
	header: {
		textAlign: 'center',
		margin: '15px'
	},
	box: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minHeight: '100vh',
	},
	link: {
		color: 'inherit',
		textDecoration: 'none'
	}
}

const User = () => {
	const users = useSelector(({ users }) => users)
	const match = useMatch('/users/:id')

	const user = match
		? users.find(user => user.id === match.params.id)
		: null
	if (!user) {
		return null
	}
	return (
		<Box style={style.box}>
			<Card variant="outlined">
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
							{user.username[0]}
						</Avatar>}
					title={user.name}
				/>
				<CardContent>
					<Typography variant="body2" color="text.primary">
						<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
							subheader={
								<ListSubheader component="div" id="nested-list-subheader">
									Added blogs:
								</ListSubheader>}
						>
							<div>
								{(user.blogs).map(blog => {
									return (
										<ListItemButton key={blog.id}>
											<Link key={user.id} to={`/blogs/${blog.id}`} style={style.link}>
												{blog.title}
											</Link>
										</ListItemButton>)
								})}
							</div>
						</List>

					</Typography>
				</CardContent>
			</Card>
		</Box>
	)
}

export default User