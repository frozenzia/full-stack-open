import { createSlice } from '@reduxjs/toolkit'

import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes', // this gives the "prefix" that'll be tacked on to all actions
  initialState: [], // defines the initial state
  reducers: { // here be possible actions that affect state
    // dispatch(toggleImportanceOf(3))
    toggleImportanceOf(state, action) { // action.type = "notes/toggleImportanceOf", action.payload = 3
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
          note.id !== id ? note : changedNote
      )
    },
    // dispatch(appendNote({ content: 'haa', important: true, id: 2 }))
    appendNote(state, action) {
      state.push(action.payload)
    },
    // dispatch(setNotes([<note1>, <note2>, ....]))
    setNotes(state, action) {
      return action.payload
    }
  },
})

// "reducers" functions are available via noteSlice.actions (WTF, but that's how it works)
export const { appendNote, setNotes, toggleImportanceOf } = noteSlice.actions

// this is an "async" supposedly "action creator"
// The action being created is actually the RETURNED async function,
// which receives "dispatch" as an argument!!!
// All made possible b/c we're using reacttoolkit + installed redux-thunk
// dispatch(initializeNotes())
export const initializeNotes = () => {
  return async (dispatch, getState) => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = (content) => {
  return async (dispatch, getState) => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

// "reducer" itself available via noteSlice.reducer (again, WTF, but that's how it works)
export default noteSlice.reducer