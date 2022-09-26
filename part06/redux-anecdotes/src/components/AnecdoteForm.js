import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const text = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(text))
		dispatch(setNotification(`Anecdote "${text}" has been added`))
		setTimeout(() => {
			dispatch(resetNotification(''))
		}, 5000)
	}

	return (
		<form onSubmit={addAnecdote}>
			<input name="anecdote" />
			<button type="submit">add</button>
		</form>
	)
}

export default AnecdoteForm