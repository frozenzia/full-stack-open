import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './App.css'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import { initializeNotes } from './reducers/noteReducer'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch])

  return(
      <div>
        <NewNote />
        <VisibilityFilter />
        <Notes />
      </div>
  )
}

export default App
