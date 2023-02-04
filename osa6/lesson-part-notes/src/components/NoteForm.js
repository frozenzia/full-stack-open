import { useState }  from 'react'

const NoteForm = ({ createNote }) => {

    const [newNote, setNewNote] = useState('')

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        createNote({
            content: newNote,
            date: new Date().toISOString(),
            important: false,
        })
        setNewNote('')
    }

    return <>
        <h2>Create a new note</h2>

        <form onSubmit={addNote}>
            <input
                id='noteInput'
                value={newNote}
                onChange={handleNoteChange}
                placeholder='write note content here'
            />
            <button id='saveNoteButton' type="submit">save</button>
        </form>
    </>
}

export default NoteForm
