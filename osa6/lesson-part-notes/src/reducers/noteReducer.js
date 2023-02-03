import { createSlice } from '@reduxjs/toolkit'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes', // this gives the "prefix" that'll be tacked on to all actions
  initialState: [], // defines the initial state
  reducers: { // here be possible actions that affect state
    // dispatch(createNote({ content: "huuhaahei", important: false }))
    createNote(state, action) { // action.type = "notes/createNote"...
      state.push(action.payload)
    },
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
export const { appendNote, createNote, setNotes, toggleImportanceOf } = noteSlice.actions

// "reducer" itself available via noteSlice.reducer (again, WTF, but that's how it works)
export default noteSlice.reducer