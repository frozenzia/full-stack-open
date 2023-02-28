import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotificationFail } from "./notificationReducer";

const initialState = null;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser() {
            return initialState;
        },
        setUser(_state, action) {
            return action.payload;
        },
    },
});

export const { resetUser, setUser } = userSlice.actions;

export const initializeUser = () => async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch(setUser(user));
        blogService.setToken(user.token);
    }
};

export const logoutUser = () => (dispatch) => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(resetUser());
};

export const loginUser = (userCreds) => async (dispatch) => {
    try {
        const user = await loginService.login(userCreds);
        window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
        blogService.setToken(user.token);
        dispatch(setUser(user));
    } catch (exception) {
        dispatch(setNotificationFail("wrong creds (username or password)"));
    }
};

export default userSlice.reducer;
