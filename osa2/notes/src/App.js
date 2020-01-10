import React, { useEffect, useState } from 'react'

import Note from './components/Note'
import noteService from './services/notes';

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('effect');
        noteService
            .getAll()
            .then((allNotes) => {
                console.log('promise fulfilled');
                setNotes(allNotes);
            });
    }, []) // <-- '[]' so effect is run only after 1st render
    console.log('render', notes.length, ' notes');

    const toggleImportanceOf = id => {
        console.log('importance of ', id, ' needs to be toggled');
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(changedNoteFromServer => {
                setNotes(notes
                    .map(note => note.id !== id ? note : changedNoteFromServer)
                )
            })
            .catch(() => {
                alert(`note '${changedNote.content}' already deleted from server`);
                setNotes(notes.filter(note => note.id !== id)); // remove note with id = id
            })

    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important) // only show important ones

    const rows = () => notesToShow.map(note =>
        <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
        />
    )

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        }
        noteService
            .create(noteObject)
            .then(createdNote => {
                setNotes(notes.concat(createdNote))
                setNewNote('')
            });
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {rows()}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App
