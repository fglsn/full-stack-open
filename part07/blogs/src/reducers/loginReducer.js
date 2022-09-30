import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'

// const initialState = { user }

const loginSlice = createSlice({
	name: 'login',
	initialState: {},
	reducers: {
		setLoggedUser(state, action) {
			return action.payload
		},
	}
})

export const { setLoggedUser, initializeUser } = loginSlice.actions

export const login = (username, password) => {
	return async dispatch => {
		const user = await loginService.login({
			username, password,
		})
		const copy = { ...user }
		window.localStorage.setItem(
			'loggedBlogappUser', JSON.stringify(copy)
		)
		blogService.setToken(copy.token)
		// console.log(user)
		dispatch(setLoggedUser(user))
	}
}

export default loginSlice.reducer