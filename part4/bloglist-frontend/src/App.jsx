import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      // when login is successful a user object with token, username etc is returned, store in localStorage
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      // TODO: to create new note pass user.token to blogService 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMsg('Wrong credentials')
      setTimeout(() => setErrorMsg(null), 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      username <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
    </div>
    <div>
      password <input type="text" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
    </div>
    <button type="submit">login</button>
  </form>
  )

  const logOutUser = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    // TODO: to create new note pass user.token to blogService as it will be null hence token is empty
  }

  // react component of a btn that calls the logOutUser functionality
  const logOutBtn = () => {
    return <button onClick={() => logOutUser()}>Logout</button>
  }

  const blogInfo = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in {logOutBtn()} </p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <ErrorNotification errorMsg={errorMsg} />
      { user === null ? loginForm() : blogInfo() }
    </div>
  )
}

export default App
