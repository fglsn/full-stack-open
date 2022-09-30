import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
// import loginService from '../services/login'

const userSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		appendUser(state, action) {
			state.push(action.payload)
		},
		setUsers(state, action) {
			return (action.payload)
		}
		// loginUser(state, action) {

		// }
	}
})

export const { appendUser, setUsers } = userSlice.actions

export const initializeUsers = () => {
	return async dispatch => {
		const users = await userService.getAll()
		dispatch(setUsers(users))
	}
}

// export const login = (username, password) => {
// 	return async dispatch => {
// 		const user = await loginService.login({
// 			username, password,
// 		})
// 		dispatch(loginUser(user))
// 	}
// }

export default userSlice.reducer