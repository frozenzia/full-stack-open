import React, { useEffect, useRef, useState } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import noteService from './services/notes';
import loginService from './services/login';
import Togglable from './components/Togglable';

import './App.css';

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
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then((allNotes) => {
        setNotes(allNotes);
      });
  }, []) // <-- '[]' so effect is run only after 1st render

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    } else {
    }
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

  const createNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(createdNote => {
        setNotes(notes.concat(createdNote))
      });
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );
      noteService.setToken(user.token);
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong creds')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return <Togglable buttonLabel='log in'>
        <h2>Login</h2>
        <LoginForm handleLogin={handleLogin} />
    </Togglable>;
  }

  const notesForm = () => <>
    <div className='loggedIn'>
      <div>
        {user.name} logged in
      </div>
      <button onClick={handleLogout}>
        logout
      </button>
    </div>
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={createNote} />
    </Togglable>
  </>;

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user && notesForm()}

      {!user && loginForm()}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <Footer />
    </div>
  )
}

export default App
