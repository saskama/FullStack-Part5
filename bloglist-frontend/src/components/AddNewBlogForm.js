import React, {useState} from 'react'

const AddNewBlogForm = ({createBlog}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('') 
  const [url, setURL] = useState('') 

  const addBlog = (event) => {
    event.preventDefault()
    
    createBlog({title, author, url})

    setTitle('')
    setAuthor('')
    setURL('') 
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          title
            <input id='title' type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
            <input id ='author' type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
            <input id='url' type="text" value={url} name="Url" onChange={({ target }) => setURL(target.value)} />
        </div>
        <button id='create-new-button' type="submit">Create</button>
      </form>
    </div>  
  )
  }

export default AddNewBlogForm