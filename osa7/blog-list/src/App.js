import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import {
    resetNotification,
    setNotificationFail,
    setNotificationSuccess,
} from "./reducers/notificationReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { setBlogs } from "./reducers/blogsReducer";
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
        blogService.getAll().then((gotBlogs) => dispatch(setBlogs(gotBlogs)));
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

    const handleAddBlog = async (blogObject) => {
        blogFormRef.current.toggleVisible();
        try {
            const resp = await blogService.create(blogObject);
            const newBlogs = [...blogs];
            newBlogs.push(resp);
            dispatch(setBlogs(newBlogs));
            showActionResult(
                `a new blog, "${resp.title}", by ${resp.author}, has been added`,
                true
            );
        } catch (exception) {
            showActionResult(exception.response.data.error, false);
        }
    };

    const increaseLikesOf = (blog) => {
        console.log("likes of ", blog.id, " needs to be increased");
        const origUser = blog.user; // must only pass ID as user to backend
        if (!origUser) {
            // case where user is unknown b/c of old notes cluttering up the place!
            showActionResult(
                "increasing likes for this blog failed, as it is a relic",
                false
            );
            return;
        }

        const changedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id,
        };

        blogService
            .update(changedBlog)
            .then((changedBlogFromServer) => {
                changedBlogFromServer.user = origUser; // replace the original user info
                dispatch(
                    setBlogs(
                        blogs.map((b) =>
                            b.id !== blog.id ? b : changedBlogFromServer
                        )
                    )
                );
            })
            .catch(() => {
                showActionResult(
                    "increasing likes for this blog failed",
                    false
                );
            });
    };

    const deleteBlog = (blogId) => {
        console.log("want to delete blog ", blogId);

        blogService
            .remove(blogId)
            .then(() => {
                dispatch(setBlogs(blogs.filter((b) => b.id !== blogId)));
            })
            .catch(() => {
                showActionResult("removing this blog failed", false);
            });
    };

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
                <AddBlogForm onSubmit={handleAddBlog} />
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
