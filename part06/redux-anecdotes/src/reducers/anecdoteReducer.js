import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload)
		},
		vote(state, action) {
			const id = action.payload
			const voteFor = state.find(anecdote => anecdote.id === id)
			const changedAnecdote = {
				...voteFor,
				votes: voteFor.votes + 1
			}
			const updatedList = state.map(anecdote =>
				anecdote.id !== id ? anecdote : changedAnecdote)
			return updatedList.sort((a, b) => b.votes - a.votes)
		},
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { createAnecdote, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer