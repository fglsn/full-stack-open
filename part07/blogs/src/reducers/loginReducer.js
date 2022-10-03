import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = localStorage.getItem('loggedBlogappUser')
	? JSON.parse(localStorage.getItem('loggedBlogappUser'))
	: null

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setLoggedUser(state, action) {
			// console.log('check', action.payload)
			return action.payload
		},
		resetToken(state, action) {
			return action.payload
		}
	},
})

export const { setLoggedUser, resetToken } = loginSlice.actions

export const login = (username, password) => {
	return async (dispatch) => {
		const user = await loginService.login({
			username,
			password,
		})
		window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
		blogService.setToken(user.token)
		// console.log(user.token)
		dispatch(setLoggedUser(user))
	}
}

export default loginSlice.reducer
