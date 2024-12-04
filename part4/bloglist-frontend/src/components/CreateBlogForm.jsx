import PropTypes from 'prop-types'

const CreateBlogForm = ({ handleSubmit, title, author, url, handleTitle, handleAuthor, handleUrl }) => {
  return (
    <form onSubmit={ handleSubmit }>
            title: <input type="text" value={ title } onChange={ handleTitle } placeholder = "title of post goes here" data-testid="title" /><br/>
            author: <input type="text" value={ author } onChange={ handleAuthor } placeholder = "name of the author" data-testid="author" /><br />
            url: <input type="text" value={url} onChange={ handleUrl } placeholder = "amazon link to book" data-testid="url" /><br />
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
