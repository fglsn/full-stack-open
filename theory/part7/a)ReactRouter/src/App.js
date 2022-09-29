import { useState } from 'react'
import { Table, Form, Alert } from 'react-bootstrap'

import {
	Routes,
	Route,
	Link,
	Navigate,
	// useParams,
	useNavigate,
	useMatch,
} from "react-router-dom"

import styled from 'styled-components'
// Practice styled-components 
const Button = styled.button`
	background: Bisque;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid Chocolate;
	border-radius: 3px;
`

const Input = styled.input`
	margin: 0.25em;
`
// apply style to certain div
const Navigation = styled.div`
	background: BurlyWood;
	padding: 1em;
`

const Home = () => (
	<div className='container'>
		<h2>TKTL notes app</h2>
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
	</div>
)

const Note = ({ note }) => {
	return (
		<div>
			<h2>{note.content}</h2>
			<div>{note.user}</div>
			<div><strong>{note.important ? 'important' : ''}</strong></div>
		</div>
	)
}

const Notes = ({ notes }) => (
	<div>
		<h2>Notes</h2>
		<Table striped>
			<tbody>
				{notes.map(note =>
					<tr key={note.id}>
						<td>
							<Link to={`/notes/${note.id}`}>{note.content}</Link>
						</td>
					</tr>
				)}
			</tbody>
		</Table>
	</div>
)

const Users = () => (
	<div>
		<h2>TKTL notes app</h2>
		<ul>
			<li>Matti Luukkainen</li>
			<li>Juha Tauriainen</li>
			<li>Arto Hellas</li>
		</ul>
	</div>
)

const Login = (props) => {
	const navigate = useNavigate()

	const onSubmit = (event) => {
		event.preventDefault()
		props.onLogin('mluukkai')
		navigate('/')
	}
	//Button, Navigation and Input components are not bootstrap, but styles components
	return (
		<div>
			<h2>login</h2>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label>username:</Form.Label>
					<Input />
					<Form.Label>password:</Form.Label>
					<Input type='password' />
					<Button type="submit" primary=''>
						login
					</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

const App = () => {

	const [notes, setNotes] = useState([
		{
			id: 1,
			content: 'HTML is easy',
			important: true,
			user: 'Matti Luukkainen'
		},
		{
			id: 2,
			content: 'Browser can execute only JavaScript',
			important: false,
			user: 'Matti Luukkainen'
		},
		{
			id: 3,
			content: 'Most important methods of HTTP-protocol are GET and POST',
			important: true,
			user: 'Arto Hellas'
		}
	])

	const [user, setUser] = useState(null)

	const [message, setMessage] = useState(null)

	const login = (user) => {
		setUser(user)
		setMessage(`welcome ${user}`)
		setTimeout(() => {
			setMessage(null)
		}, 10000)
	}

	const padding = {
		padding: 5
	}


	const match = useMatch('/notes/:id')
	const note = match
		? notes.find(note => note.id === Number(match.params.id))
		: null

	return (
		<div className='container-fluid'>
			{(message &&
				<Alert variant="success">
					{message}
				</Alert>
			)}
			<Navigation>
				<Link style={padding} to="/">home</Link>
				<Link style={padding} to="/notes">notes</Link>
				<Link style={padding} to="/users">users</Link>
				{user
					? <em>{user} logged in</em>
					: <Link style={padding} to="/login">login</Link>
				}
			</Navigation>

			<Routes>
				<Route path="/notes/:id" element={<Note note={note} />} />
				<Route path="/notes" element={<Notes notes={notes} />} />
				<Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
				<Route path="/login" element={<Login onLogin={login} />} />
				<Route path="/" element={<Home />} />
			</Routes>
			<div className='container'>
				<br />
				<em>Note app, Department of Computer Science 2022</em>
			</div>
		</div>
	)
}

export default App