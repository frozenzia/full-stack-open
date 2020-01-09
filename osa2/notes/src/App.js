import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Note from './components/Note'


const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('effect');
        axios
            .get('http://localhost:3001/notes')
            .then((resp) => {
                console.log('promise fulfilled');
                setNotes(resp.data);
            });
    }, []) // <-- '[]' so effect is run only after 1st render
    console.log('render', notes.length, ' notes');

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important) // only show important ones

    const rows = () => notesToShow.map(note =>
        <Note
            key={note.id}
            note={note}
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
            id: notes.length + 1,
        }

        setNotes(notes.concat(noteObject))
        setNewNote('')
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
