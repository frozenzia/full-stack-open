import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";
import {
    setNotificationFail,
    setNotificationSuccess,
} from "./notificationReducer";

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
    },
});

export const { resetBlogs, setBlogs, appendBlog } = blogsSlice.actions;

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
            setNotificationSuccess(
                `a new blog, "${resp.title}", by ${resp.author}, has been added`
            )
        );
    } catch (exception) {
        dispatch(setNotificationFail(exception.response.data.error));
    }
};

export default blogsSlice.reducer;
