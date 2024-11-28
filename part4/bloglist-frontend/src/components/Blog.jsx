import { useState } from 'react'

const Blog = ({ blog, updateLikes }) => {
  const [showFullDetails, setShowFullDetails] = useState(true)

  const hideWhenVisible = { display: showFullDetails ? 'none' : '' }
  // const showWhenVisible = { display: showFullDetails ? '' : 'none' }

  const blogStyle = {
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle }>
    <p>{blog.title} <button onClick={() => setShowFullDetails(!showFullDetails)}>{showFullDetails ? 'view' : 'hide '}</button></p>
    
    <div style={ hideWhenVisible }>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={ updateLikes }>like</button></p>
      <p>{blog.author}</p>
    </div>

  </div>  
  )
}

export default Blog
