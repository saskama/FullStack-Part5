import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  console.log(newObject)
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response)
  console.log("Blog added")

  return response.data

}

const add_like = async blog => {

  const new_blog = {user: blog.user.id,
                    likes: blog.likes+1,
                    author: blog.author,
                    title: blog.title,
                    url: blog.url}

  const response = await axios.put(baseUrl + '/' + blog.id, new_blog)

  return response.data
}


const deleteBlog = async blog => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl + '/' + blog.id, config)

  return response.data

}

const exports = { getAll, setToken, add, add_like, deleteBlog }

export default exports