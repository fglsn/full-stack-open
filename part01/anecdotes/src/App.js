import { useState } from 'react'

const Button = ({handleClick, text}) =>
	<button onClick={handleClick}>
		{text}
	</button>

const AnecdoteDisplay = ({anecdote, votes}) =>
	<p>{anecdote} has {votes} votes</p>

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
	]

	const len = anecdotes.length

	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(Array(len).fill(0))
	const [topRated, setTopRated] = useState(0)

	const showAnecdote = () => {
		let random = Math.floor(Math.random() * len);
		setSelected(random);
	}

	const addVote = () => {
		const votesCopy = [...votes]
		votesCopy[selected] += 1
		setVotes(votesCopy)

		let topVotedIndex = votesCopy.indexOf(Math.max(...votesCopy));
		setTopRated(topVotedIndex)
	}

	// console.log("Top rated anecdote num is", topRated)
	// console.log(votes)

	return (
		<div>
			<h3>Anecdote of the day</h3>
			<AnecdoteDisplay anecdote={anecdotes[selected]} votes={votes[selected]}/>
			<div>
				<Button handleClick={showAnecdote} text='next anecdote'/>
				<Button handleClick={addVote} text='vote'/>
			</div>
			<h3>Anecdote with most votes</h3>
			<AnecdoteDisplay anecdote={anecdotes[topRated]} votes={votes[topRated]}/>
		</div>
	)
}

export default App