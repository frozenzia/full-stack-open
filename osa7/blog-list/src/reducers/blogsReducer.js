import { createSlice } from "@reduxjs/toolkit";

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

export default blogsSlice.reducer;
