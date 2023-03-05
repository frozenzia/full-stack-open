import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import { AppBar, Container, Stack, Toolbar } from "@mui/material";

import Blog from "./components/Blog";
import User from "./components/UserView";
import Users from "./components/UsersView";
import BlogView from "./components/BlogView";
import OwnButton from "./components/OwnButton";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import { initializeUsers } from "./reducers/usersReducer";
import { increaseLikes, initializeBlogs } from "./reducers/blogsReducer";
import { initializeUser, loginUser, logoutUser } from "./reducers/userReducer";

const Menu = () => {
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(logoutUser());
    const margin = {
        marginRight: 5,
    };
    const menuStyle = {
        backgroundColor: "lightGrey",
    };
    return (
        <>
            <AppBar position="static" style={menuStyle}>
                <Toolbar>
                    <OwnButton style={margin} component={Link} to="/blogs">
                        blogs
                    </OwnButton>
                    <OwnButton style={margin} component={Link} to="/users">
                        users
                    </OwnButton>
                    <LoggedInUserHeader
                        style={{ position: "absolute", right: "1em" }}
                        onClick={handleLogout}
                    />
                </Toolbar>
            </AppBar>
            <h2> blog app</h2>
        </>
    );
};

const LoggedInUserHeader = ({ onClick, ...props }) => {
    const user = useSelector((state) => state.user);
    if (!user) {
        return null;
    }
    return (
        <span {...props}>
            {user.name} logged in
            <OwnButton
                style={{ marginLeft: "1em" }}
                onClick={onClick}
                data-cy="logoutButton"
            >
                logout
            </OwnButton>
        </span>
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
            <Stack spacing={2}>
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </Stack>
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
        <Container>
            <Notification />
            <Menu />
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
        </Container>
    );
};

export default App;
