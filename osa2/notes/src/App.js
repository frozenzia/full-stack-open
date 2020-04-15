import React, { useEffect, useState } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import noteService from './services/notes';
import loginService from './services/login';

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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleUsernameChange = (text) => {
    setUsername(text);
  }

  const handlePasswordChange = (text) => {
    setPassword(text);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );
      noteService.setToken(user.token);
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong creds')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      <h2>Login</h2>

      {!user
        ? <LoginForm
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange}
            handleLogin={handleLogin}
          />
        :
        <div>
          <p>{user.name} logged in</p>
          <NoteForm
            newNote={newNote}
            handleNoteChange={handleNoteChange}
            addNote={addNote}
          />
        </div>
      }

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
