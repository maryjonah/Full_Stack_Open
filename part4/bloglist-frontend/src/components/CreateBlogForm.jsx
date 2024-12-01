import PropTypes from 'prop-types'

const CreateBlogForm = ({ handleSubmit, title, author, url, handleTitle, handleAuthor, handleUrl }) => {
  return (
    <form onSubmit={ handleSubmit }>
            title: <input type="text" value={ title } onChange={ handleTitle } placeholder = "title of post goes here" /><br/>
            author: <input type="text" value={ author } onChange={ handleAuthor } placeholder = "name of the author" /><br />
            url: <input type="text" value={url} onChange={ handleUrl } placeholder = "amazon link to book" /><br />
      <button type="submit">create new blog</button>
    </form>
  )
}

CreateBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleTitle: PropTypes.func.isRequired,
  handleAuthor:  PropTypes.func.isRequired,
  handleUrl: PropTypes.func.isRequired
}

export default CreateBlogForm
