import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";

import {
    increaseLikes,
    initializeBlogs,
    removeBlog,
} from "./reducers/blogsReducer";
import Blog from "./components/Blog";
import User from "./components/UserView";
import Users from "./components/UsersView";
import BlogView from "./components/BlogView";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import { initializeUsers } from "./reducers/usersReducer";
import { initializeUser, loginUser, logoutUser } from "./reducers/userReducer";

const Menu = () => {
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(logoutUser());
    const padding = {
        paddingRight: 5,
    };
    const menuStyle = {
        backgroundColor: "lightGrey",
        padding: 5,
    };
    return (
        <>
            <div style={menuStyle}>
                <Link to="/blogs" style={padding}>
                    blogs
                </Link>
                <Link to="/users" style={padding}>
                    users
                </Link>
                <LoggedInUserHeader onClick={handleLogout} />
            </div>
            <h2> blog app</h2>
        </>
    );
};

const LoggedInUserHeader = ({ onClick }) => {
    const user = useSelector((state) => state.user);
    if (!user) {
        return null;
    }
    return (
        <>
            {user.name} logged in{" "}
            <button onClick={onClick} data-cy="logoutButton">
                logout
            </button>
        </>
    );
};

const Blogs = () => {
    const blogFormRef = useRef();

    const blogSort = (a, b) => (a.likes > b.likes ? -1 : 1);
    const blogs = useSelector((state) => {
        const blogsToReturn = [...state.blogs];
        return blogsToReturn.sort(blogSort);
    });

    const handleAddBlogPressed = () => blogFormRef.current.toggleVisible();

    return (
        <div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <AddBlogForm onSubmit={handleAddBlogPressed} />
            </Togglable>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

const Login = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        dispatch(loginUser({ username, password }));
        setUsername("");
        setPassword("");
    };

    return (
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
};

const Home = () => {
    const user = useSelector((state) => state.user);
    return user ? <Blogs /> : <Login />;
};

const App = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const blogs = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUser());
        dispatch(initializeUsers());
    }, []);

    const increaseLikesOf = (blog) => dispatch(increaseLikes(blog));

    const match = useMatch("/users/:id");
    const user = match ? users.find((u) => u.id === match.params.id) : null;

    const matchBlog = useMatch("/blogs/:id");
    const blog = matchBlog
        ? blogs.find((b) => b.id === matchBlog.params.id)
        : null;

    return (
        <>
            <Menu />
            <Notification />
            <Routes>
                <Route path="/users/:id" element={<User user={user} />} />
                <Route path="/users" element={<Users />} />
                <Route
                    path="/blogs/:id"
                    element={
                        <BlogView blog={blog} onLikeBlog={increaseLikesOf} />
                    }
                />
                <Route path="/blogs" element={<Home />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
};

export default App;
