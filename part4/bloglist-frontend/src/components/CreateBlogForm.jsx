const CreateBlogForm = ({ handleSubmit, title, author, url, handleTitle, handleAuthor, handleUrl }) => {
    return (
        <form onSubmit={ handleSubmit }>
            title: <input type="text" value={ title } onChange={ handleTitle } /><br/>
            author: <input type="text" value={ author } onChange={ handleAuthor } /><br />
            url: <input type="text" value={url} onChange={ handleUrl } /><br />
        <button type="submit">create</button>
      </form>
  
    )
}

export default CreateBlogForm
