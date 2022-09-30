import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import store from './store'

import blogsService from './services/blogs'
import { setBlogs } from './reducers/blogReducer'

blogsService.getAll().then(blogs =>
	store.dispatch(setBlogs(blogs))
)

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>

	</Provider>
)
