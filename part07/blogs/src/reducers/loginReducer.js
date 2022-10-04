import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

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
	},
})

export const { setLoggedUser } = loginSlice.actions

export const login = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			dispatch(setLoggedUser(user))
			dispatch(setNotification(`${user.username} logged in!`, 3))
		}
		catch (err) {
			dispatch(setNotification(err.response.data.error, 5))
		}
	}
}


export default loginSlice.reducer
