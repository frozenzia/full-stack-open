import React from 'react'

const NoteForm = ({ newNote, handleNoteChange, addNote }) => (
  <form onSubmit={addNote}>
    <input
      value={newNote}
      onChange={handleNoteChange}
    />
    <button type="submit">save</button>
  </form>
)

export default NoteForm
