import { connect } from 'react-redux'
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

const AnecdoteList = (props) => {
	return (
		<div>
			{props.anecdotes.map(anecdote =>
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => props.vote(props.anecdotes, anecdote.id)}
				/>
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	if (state.filter) {
		const anecdotes = (state.anecdotes).filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
		return ({ anecdotes })
	}
	return { anecdotes: state.anecdotes }
}

const mapDispatchToProps = {
	vote
}

const ConnectedAnecdotes = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotes;
