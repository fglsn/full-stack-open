import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		setNotification(state, action) {
			state = action.payload
			return state
		}
	}

})

export const { setNotification } = notificationSlice.actions

// export const showNotification = (content) => {
// 	return (dispatch) => {
// 		dispatch(setNotification(`Vote goes to ${content}`))
// 	}
// }

export default notificationSlice.reducer