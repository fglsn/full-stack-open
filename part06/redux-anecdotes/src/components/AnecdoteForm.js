import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()
		const text = event.target.anecdote.value
		event.target.anecdote.value = ''
		const newAnecdote = await anecdoteService.createNew(text)
		dispatch(createAnecdote(newAnecdote))
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