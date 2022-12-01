import { useEffect, useRef, useState } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [actionResult, setActionResult] = useState(null)

    const blogFormRef = useRef()

    const setBlogsSorted = (blogs) => {
        setBlogs(blogs.sort((a, b) => a.likes > b.likes ? -1 : 1))
    }

    useEffect(() => {
        blogService.getAll()
            .then(blogs => setBlogsSorted(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, []) // <-- '[]' so effect is run only after 1st render

    const showActionResult = (text, succeeded) => {
        setActionResult({ text, succeeded })
        setTimeout(() => {
            setActionResult(null)
        }, 5000)
    }

    const handleUsernameChange = (text) => {
        setUsername(text)
    }

    const handlePasswordChange = (text) => {
        setPassword(text)
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogUser')
        setUser(null)
    }

    const handleAddBlog = async (blogObject) => {
        blogFormRef.current.toggleVisible()
        try {
            const resp = await blogService.create(blogObject)
            const newBlogs = [...blogs]
            newBlogs.push(resp)
            setBlogsSorted(newBlogs)
            showActionResult(`a new blog, "${resp.title}", by ${resp.author}, has been added`, true)
        } catch (exception) {
            showActionResult(exception.response.data.error, false)
        }
    }

    const increaseLikesOf = blog => {
        console.log('likes of ', blog.id, ' needs to be increased')
        const origUser = blog.user // must only pass ID as user to backend
        const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }

        blogService
            .update(changedBlog)
            .then(changedBlogFromServer => {
                changedBlogFromServer.user = origUser // replace the original user info
                setBlogsSorted(blogs
                    .map(b => b.id !== blog.id ? b : changedBlogFromServer)
                )
            })
            .catch(() => {
                showActionResult('increasing likes for this blog failed', false)
            })
    }

    const deleteBlog = blogId => {
        console.log('want to delete blog ', blogId)

        blogService
            .remove(blogId)
            .then(
                setBlogsSorted(blogs
                    .filter(b => b.id !== blogId)
                )
            )
            .catch(() => {
                showActionResult('removing this blog failed', false)
            })
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            showActionResult('wrong creds (username or password)', false)
        }
    }

    const showBlogs = () => (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <AddBlogForm onSubmit={handleAddBlog} />
            </Togglable>
            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    onLikePress={increaseLikesOf}
                    onDeletePress={deleteBlog}
                    username={user.username}
                    blog={blog}
                />
            )}
        </div>
    )

    const showLogin = () => (
        <div>
            <h2>log in to application</h2>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange}
                handleLogin={handleLogin}
            />
        </div>
    )

    return <>
        <Notification
            message={actionResult && actionResult.text}
            succeeded={actionResult && actionResult.succeeded}
        />
        {user ? showBlogs() : showLogin()}
    </>
}

export default App
