import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogsList = ({blogs, user, updateblogs}) => { 

    const deleteBlog = (blogToDelete) => {
        if (window.confirm(`Remove blog ${blogToDelete.name} by ${blogToDelete.author}`)) {
            blogService.deleteBlog(blogToDelete)
            const newBlogList = blogs.filter(b => b.id !== blogToDelete.id)
            updateblogs(newBlogList)
        }
    }

    const addLike = (blogtoAddLike) => {
        blogService.add_like(blogtoAddLike)

        const newBlogList = [...blogs]
        newBlogList[newBlogList.findIndex((obj=> obj.id ===blogtoAddLike.id))].likes += 1
        updateblogs(newBlogList)
    }

    blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))

return(
    <div>
        {blogs.map(blog =><Blog key={blog.id} blog={blog} user={user} 
                            handleDelete={deleteBlog} handleAddLike={addLike}/>)}
    </div>
    )
}

export default BlogsList