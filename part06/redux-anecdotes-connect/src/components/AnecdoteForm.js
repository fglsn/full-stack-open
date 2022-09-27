import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

	const addAnecdote = (event) => {
		event.preventDefault()
		const text = event.target.anecdote.value
		event.target.anecdote.value = ''
		props.createAnecdote(text)
		props.setNotification(`New anecdote: '${text}'`, 10)
	}

	return (
		<form onSubmit={addAnecdote}>
			<input name="anecdote" />
			<button type="submit">add</button>
		</form>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		createAnecdote: value => {
			dispatch(createAnecdote(value))
		},
		setNotification: value => {
			dispatch(setNotification(value))
		}
	}
}

export default connect(
	null,
	mapDispatchToProps
)(AnecdoteForm)