import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const initialState = [];

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload);
            return state;
        },
        // dispatch(setBlogs([<blog1>, <blog2>, etc...]))
        setBlogs(_state, action) {
            // action.type = 'blogs/setBlogs', action.payload = [<blog1>, <blog2>, etc...]
            return action.payload;
        },
        resetBlogs() {
            return initialState;
        },
        // dispatch(updateBlog(<changedBlog>))
        updateBlog(state, action) {
            return state.map((b) =>
                b.id !== action.payload.id ? b : action.payload
            );
        },
        deleteBlog(state, action) {
            return state.filter((b) => b.id !== action.payload);
        },
    },
});

export const { appendBlog, deleteBlog, resetBlogs, setBlogs, updateBlog } =
    blogsSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
};

export const createNewBlog = (blogContent) => async (dispatch) => {
    try {
        const resp = await blogService.create({
            ...blogContent,
            likes: 0,
        });
        dispatch(appendBlog(resp));
        dispatch(
            setNotification(
                `a new blog, "${resp.title}", by ${resp.author}, has been added`,
                true,
                3
            )
        );
    } catch (exception) {
        dispatch(setNotification(exception.response.data.error, false, 3));
    }
};

export const createNewComment = (blogId, comment) => async (dispatch) => {
    try {
        await blogService.addComment(blogId, comment);
        const blogs = await blogService.getAll();
        const commentedBlog = blogs.find((b) => b.id === blogId);
        dispatch(updateBlog(commentedBlog));
    } catch (exception) {
        dispatch(setNotification(exception.response.data.error, false, 3));
    }
};

export const increaseLikes = (blog) => async (dispatch) => {
    console.log("likes of ", blog.id, " needs to be increased");
    const origUser = blog.user; // must only pass ID as user to backend
    if (!origUser) {
        // case where user is unknown b/c of old notes cluttering up the place!
        dispatch(
            setNotification(
                "increasing likes for this blog failed, as it is a relic",
                false,
                3
            )
        );
        return;
    }

    const changedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
        comments: blog.comments.map((c) => c.id),
    };

    try {
        const changedBlogFromServer = await blogService.update(changedBlog);
        changedBlogFromServer.user = origUser; // replace the original user info
        dispatch(updateBlog(changedBlogFromServer));
    } catch (exception) {
        dispatch(
            setNotification("increasing likes for this blog failed", false, 3)
        );
    }
};

export const removeBlog = (blogId) => async (dispatch) => {
    console.log("want to delete blog ", blogId);
    try {
        await blogService.remove(blogId);
        dispatch(deleteBlog(blogId));
    } catch (exception) {
        dispatch(setNotification("removing this blog failed", false, 3));
    }
};

export default blogsSlice.reducer;
