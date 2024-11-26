import { useState, useEffect } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // check if user is saved in localStorage if yes set details in user state and create Bearer token
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user  = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  // Add a new Note
  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  // Update status of note - important or not
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id == id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note ${note.content} was already removed from server`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const logOutUser = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    noteService.setToken(user.token)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none'}

    return (
      <div>
        <div style={ hideWhenVisible }>
          <button onClick={ () => setLoginVisible(true)}>log in</button>
        </div>
        
        <div style={ showWhenVisible}>
          <LoginForm
            username={ username }
            password = { password }
            handleUsernameChange={ handleUsernameChange }
            handlePasswordChange={ handlePasswordChange }
            handleSubmit = { handleLogin }
          />
          <button onClick={ () => setLoginVisible(false) }>cancel</button>
        </div>
      </div>
    )
  }


  const logOut = () => (
    <button onClick={() => logOutUser()}>logout </button>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      { user === null ? loginForm() : 
        <div>
          <p>{user.name} logged-in</p>
          <Togglable buttonLabel="new note">
              <NoteForm
                  onSubmit={addNote}
                  value={newNote}
                  handleChange={ handleNoteChange }
              />
          </Togglable>
          { logOut() }
        </div>
      }


      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>


      <Footer />
    </div>
  )
}

export default App
