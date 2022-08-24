import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)

	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	const toggleImportance = id => {
		const note = notes.find(note => note.id === id)
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote)
			.then(returnedNote => {
				setNotes(notes.map(note => note.id !== id ? note : returnedNote))
			})
			.catch(error => {
				alert(
				  `the note '${note.content}' was already deleted from server`
				)
				setNotes(notes.filter(n => n.id !== id))
			  })
	}

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
		}

		noteService
			.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
				setNewNote('')
			})
	}

	const handleNoteChange = (event) => {
		console.log(event.target.value)
		setNewNote(event.target.value)
	}

	const notesToShow = showAll
	? notes
	: notes.filter(note => note.important)

	return (
	  <div>
		<h1>Notes</h1>
		<button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all' }</button>
		<ul>
			{notesToShow.map(note => 
				<Note 
					key={note.id}
					note={note}
					toggleImportance={() => toggleImportance(note.id)}/>
			)}
		</ul>
		<form onSubmit={addNote}>
			<input value={newNote} onChange={handleNoteChange}/>
			<button type='submit'>save</button>
		</form>
	  </div>
	)
  }
  export default App