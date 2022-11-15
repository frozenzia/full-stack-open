import React, { useState, useEffect } from "react"

import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"

import "./App.css"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        blogService.getAll()
            .then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, []) // <-- '[]' so effect is run only after 1st render

    const handleUsernameChange = (text) => {
        setUsername(text)
    }

    const handlePasswordChange = (text) => {
        setPassword(text)
    }

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogUser")
        setUser(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            console.log("user: ", user)
            window.localStorage.setItem(
                "loggedBlogUser", JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
        } catch (exception) {
            setErrorMessage("wrong creds")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const showBlogs = () => (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
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

    return user
        ? showBlogs()
        : showLogin()
}

export default App
