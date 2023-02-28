import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import {
    increaseLikes,
    initializeBlogs,
    removeBlog,
} from "./reducers/blogsReducer";
import {
    resetNotification,
    setNotificationFail,
    setNotificationSuccess,
} from "./reducers/notificationReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";

const App = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const blogFormRef = useRef();

    const blogSort = (a, b) => (a.likes > b.likes ? -1 : 1);

    const blogs = useSelector((state) => {
        const blogsToReturn = [...state.blogs];
        return blogsToReturn.sort(blogSort);
    });

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []); // <-- '[]' so effect is run only after 1st render

    const showActionResult = (text, succeeded) => {
        if (succeeded) {
            dispatch(setNotificationSuccess(text));
        } else {
            dispatch(setNotificationFail(text));
        }
        setTimeout(() => {
            dispatch(resetNotification());
        }, 5000);
    };

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogUser");
        setUser(null);
    };

    const handleAddBlogPressed = () => blogFormRef.current.toggleVisible();

    const increaseLikesOf = (blog) => dispatch(increaseLikes(blog));

    const deleteBlog = (blogId) => dispatch(removeBlog(blogId));

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            showActionResult("wrong creds (username or password)", false);
        }
    };

    const showBlogs = () => (
        <div>
            <h2>blogs</h2>
            <p>
                {user.name} logged in{" "}
                <button onClick={handleLogout} data-cy="logoutButton">
                    logout
                </button>
            </p>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <AddBlogForm onSubmit={handleAddBlogPressed} />
            </Togglable>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    onLikePress={increaseLikesOf}
                    onDeletePress={deleteBlog}
                    username={user.username}
                    blog={blog}
                />
            ))}
        </div>
    );

    const showLogin = () => (
        <div>
            <h2>log in to application</h2>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
                handleLogin={handleLogin}
            />
        </div>
    );

    return (
        <>
            <Notification />
            {user ? showBlogs() : showLogin()}
        </>
    );
};

export default App;
