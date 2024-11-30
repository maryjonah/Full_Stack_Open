import PropTypes from 'prop-types'
import { useState } from 'react'


const Blog = ({ blog, updateLikes, deleteBlog, currentUser }) => {
  const [showFullDetails, setShowFullDetails] = useState(true)

  const hideWhenVisible = { display: showFullDetails ? 'none' : '' }
  const canRemove = currentUser === blog.user.username

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
        { canRemove && <button onClick={ deleteBlog }>remove</button>}
      </div>

    </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired
}

export default Blog
