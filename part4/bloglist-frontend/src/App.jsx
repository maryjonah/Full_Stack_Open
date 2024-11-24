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

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
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

  const blogInfo = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
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
