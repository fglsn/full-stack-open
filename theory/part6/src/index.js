import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import filterReducer from './reducers/filterReducer'

import noteService from './services/notes'
import noteReducer, { setNotes } from './reducers/noteReducer'

const store = configureStore({
	reducer: {
		notes: noteReducer,
		filter: filterReducer
	}
})

// console.log(store.getState())

noteService.getAll().then(notes =>
	store.dispatch(setNotes(notes))
)

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
)