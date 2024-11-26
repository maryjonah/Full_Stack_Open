import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showFullDetails, setShowFullDetails] = useState(false)

  const hideWhenVisible = { display: showFullDetails ? 'none' : '' }
  const showWhenVisible = { display: showFullDetails ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle }>
    <p>{blog.title}<button onClick={() => setShowFullDetails(!showFullDetails)}>{showFullDetails ? 'show' : 'hide '}</button></p>
    <p>{blog.url}</p>
    <p>likes {blog.likes}</p>
    <p>{blog.author}</p>
  </div>  
  )
}

export default Blog