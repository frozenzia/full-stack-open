import React, { useEffect, useState } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes';

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2019</em>
        </div>
    )
}

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        console.log('effect');
        noteService
            .getAll()
            .then((allNotes) => {
                console.log('promise fulfilled');
                setNotes(allNotes);
            });
    }, []) // <-- '[]' so effect is run only after 1st render

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
                setErrorMessage(`Note '${changedNote.content}' already deleted from server`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
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

            <Notification message={errorMessage} />

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
            <Footer />
        </div>
    )
}

export default App
