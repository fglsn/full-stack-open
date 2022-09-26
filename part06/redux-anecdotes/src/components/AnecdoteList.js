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
	const anecdotes = useSelector(state => state.anecdotes)

	const handleVote = (id, content) => {
		dispatch(vote(id))
		dispatch(setNotification(`vote goes to ${content}`))
		setTimeout(() => {
			dispatch(setNotification(''))
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