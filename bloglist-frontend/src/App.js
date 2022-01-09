import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import AddNewBlogForm from './components/AddNewBlogForm'
import Notifications from './components/Notifications'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login' 
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  const [successMessage, setsuccessMessage] = useState('') 
  const [errorMessage, seterrorMessage] = useState('') 

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()

    console.log(username, password)

    try {
      console.log("ping")
      const user = await loginService.login({username, password,})
      setUsername('')
      setPassword('')
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      console.log(exception)
      seterrorMessage('wrong username or password')
      setTimeout(() => {
        seterrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async(event) => {
    window.localStorage.removeItem('loggedBlogppUser')
    setUser(null)
  }

  const addBlog = async(blogObject) => {

    const newblog =  await blogService.add(blogObject)
    setBlogs(blogs.concat(newblog))
    console.log("moi")
    console.log(newblog)

    blogFormRef.current.toggleVisibility()
    setsuccessMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)

    setTimeout(() => {
      setsuccessMessage(null)
    }, 5000)

  }

  if (user === null) {

    return (
      <div>
        <h2>Log in to application</h2>
        <Notifications.ErrorNotification message={errorMessage}/>
        <LoginForm username={username} password={password} 
                   handleLogin={handleLogin} setUsername={setUsername}
                   setPassword={setPassword} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notifications.SuccessNotification message={successMessage}/>
      <Notifications.ErrorNotification message={errorMessage}/>

      <div>
          <p>{user.name} logged in <button onClick={handleLogOut}>Logout</button> </p>
      </div>

      <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>

        <AddNewBlogForm id='createNewBlog' createBlog={addBlog} />
      
      </Togglable>

      <br></br>

      <BlogList blogs={blogs} user={user }updateblogs={setBlogs}/>
        
    </div>
  )
}

export default App