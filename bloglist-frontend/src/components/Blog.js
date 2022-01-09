import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleDelete, handleAddLike}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  if (!visible) {
    return (
      <div className='blog' style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
    )
  }

  return (

    <div className='blog' style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
      <p>{blog.url}</p> 
      <p>Likes: {blog.likes} <button id={blog.name} onClick = {() => handleAddLike(blog)}>like</button></p> 
      <p>{blog.user.name}</p> 
      {user.name === blog.user.name && <button onClick={()=>handleDelete(blog)}>delete</button>}

  </div>
)}

// Blog.propTypes = {
//   blog: PropTypes.func.isRequired,
//   user: PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired,
//   handleAddLike: PropTypes.string.isRequired
// }

export default Blog