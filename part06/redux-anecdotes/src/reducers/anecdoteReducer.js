import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		setAnecdotes(state, action) {
			return (action.payload).sort((a, b) => b.votes - a.votes)
		}
	}
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const vote = (anecdotes, id) => {
	const voteFor = anecdotes.find(anecdote => anecdote.id === id)
	const changedAnecdote = {
		...voteFor,
		votes: voteFor.votes + 1
	}
	return async dispatch => {
		await anecdoteService.addVote(id, changedAnecdote)
		const updatedList = anecdotes
			.map(anecdote =>
				anecdote.id !== id ? anecdote : changedAnecdote)
		dispatch(setAnecdotes(updatedList))
	}
}

export default anecdoteSlice.reducer
