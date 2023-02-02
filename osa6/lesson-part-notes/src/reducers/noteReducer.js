import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  },
  {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
]

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes', // this gives the "prefix" that'll be tacked on to all actions
  initialState, // defines the initial state
  reducers: { // here be possible actions that affect state
    // dispatch(createNote("huuhaahei"))
    createNote(state, action) { // action.type = "notes/createNote", action.payload = "huuhaahei"
      const content = action.payload
      state.push({
        content,
        important: false,
        id: generateId()
      })
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
    }
  },
})

// "reducers" functions are available via noteSlice.actions (WTF, but that's how it works)
export const { createNote, toggleImportanceOf } = noteSlice.actions

// "reducer" itself available via noteSlice.reducer (again, WTF, but that's how it works)
export default noteSlice.reducer

// const noteReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case 'NEW_NOTE':
//             return [...state, action.data]
//         case 'TOGGLE_IMPORTANCE':
//             const id = action.data.id
//             const noteToChange = state.find(n => n.id === id)
//             const changedNote = { 
//                 ...noteToChange, 
//                 important: !noteToChange.important 
//             }
//             return state.map(note =>
//                 note.id !== id ? note : changedNote 
//             )
//         default:
//             return state
//     }
// }

  
// export const createNote = (content) => ({
//   type: 'NEW_NOTE',
//   data: {
//     content,
//     important: false,
//     id: generateId()
//   }
// })
// export const toggleImportanceOf = (id) => ({
//   type: 'TOGGLE_IMPORTANCE',
//   data: { id }
// })

// export default noteReducer