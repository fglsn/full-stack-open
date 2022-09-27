import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

	const handleVote = async (anecdotes, anecdote) => {
		dispatch(vote(anecdotes, anecdote.id))
		dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
	}

	return (
		<div>
			{anecdotes.map(anecdote =>
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => handleVote(anecdotes, anecdote)}
				/>
			)}
		</div>
	)
}

export default AnecdoteList