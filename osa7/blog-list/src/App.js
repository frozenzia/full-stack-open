import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    increaseLikes,
    initializeBlogs,
    removeBlog,
} from "./reducers/blogsReducer";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import { initializeUser, loginUser, logoutUser } from "./reducers/userReducer";

const App = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const blogFormRef = useRef();

    const blogSort = (a, b) => (a.likes > b.likes ? -1 : 1);

    const blogs = useSelector((state) => {
        const blogsToReturn = [...state.blogs];
        return blogsToReturn.sort(blogSort);
    });
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    useEffect(() => {
        dispatch(initializeUser());
    }, []); // <-- '[]' so effect is run only after 1st render

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleLogout = () => dispatch(logoutUser());

    const handleAddBlogPressed = () => blogFormRef.current.toggleVisible();

    const increaseLikesOf = (blog) => dispatch(increaseLikes(blog));

    const deleteBlog = (blogId) => dispatch(removeBlog(blogId));

    const handleLogin = async (event) => {
        event.preventDefault();
        dispatch(loginUser({ username, password }));
        setUsername("");
        setPassword("");
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
