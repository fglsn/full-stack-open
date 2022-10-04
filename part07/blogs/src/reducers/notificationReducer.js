import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		showNotification(state, action) {
			return action.payload
		}
	}
})

export const { showNotification, showError } = notificationSlice.actions

let timer = null

export const setNotification = (content, time) => {
	return (dispatch) => {
		clearTimeout(timer)
		dispatch(showNotification(content))
		timer = setTimeout(() => {
			dispatch(showNotification(null))
		}, 1000 * time)
	}
}

export default notificationSlice.reducer
