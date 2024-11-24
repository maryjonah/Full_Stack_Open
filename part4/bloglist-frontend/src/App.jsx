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
  
  // state for adding new blog details
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // check if user details is stored in localStorage then create token which will be needed for creating a blog
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  // executes when the form to create a new blog is submitted
  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    })
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      // when login is successful a user object with token, username etc is returned, store in localStorage
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)

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

  const newBlogForm = () => (
    <form onSubmit={addBlog}>
      title: <input type="text" value={newTitle} onChange={({target}) => setTitle(target.value)} /><br/>
      author: <input type="text" value={newAuthor} onChange={({target}) => setAuthor(target.value)} /><br />
      url: <input type="text" value={newUrl} onChange={({target}) => setUrl(target.value)} /><br />

      <button type="submit">create</button>
    </form>
  )

  const logOutUser = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(user.token)
  }

  // react component of a btn that calls the logOutUser functionality
  const logOutBtn = () => {
    return <button onClick={() => logOutUser()}>Logout</button>
  }

  const blogInfo = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in { logOutBtn() } </p>

      <h2>create new </h2>
      { newBlogForm() }

      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  return (
    <div>
      <ErrorNotification errorMsg={errorMsg} />
      { user === null ? loginForm() : 
      <div>
        { blogInfo() }
      </div> } 
    </div>
  )
}

export default App
