import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/userReducer'

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		users: userReducer,
		notification: notificationReducer,
		loggedUser: loginReducer,
	}
})

export default store