import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div>
			{anecdote.content}
			<div>
				<button onClick={handleClick}>Vote</button>
				{anecdote.votes}
			</div>
		</div>
	)
}

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		if (!filter)
			return anecdotes
		return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
	})

	const handleVote = async (id, content) => {
		dispatch(vote(id))
		dispatch(setNotification(`vote goes to ${content}`))
		setTimeout(() => {
			dispatch(resetNotification(''))
		}, 5000)
	}

	return (
		<div>
			{anecdotes.map(anecdote =>
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => handleVote(anecdote.id, anecdote.content)}
				/>
			)}
		</div>
	)
}

export default AnecdoteList