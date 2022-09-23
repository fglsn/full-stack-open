import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {
	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const text = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(text))
	}

	return (
		<form onSubmit={addAnecdote}>
			<input name="anecdote" />
			<button type="submit">add</button>
		</form>
	)
}

export default NewAnecdote