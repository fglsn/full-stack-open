import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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

const Anecdotes = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state)

	return (
		<div>
			{anecdotes.map(anecdote => 
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => dispatch(vote(anecdote.id))}
				/>
			)}
		</div>
	)
}

export default Anecdotes