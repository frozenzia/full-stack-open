import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";
import blogsReducer from "./reducers/blogsReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        blogs: blogsReducer,
        notification: notificationReducer,
    },
});

export default store;
