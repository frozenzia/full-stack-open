import { createSlice } from "@reduxjs/toolkit";

import usersService from "../services/users";

const initialState = [];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // dispatch(setUsers([<user1>, <user2>, etc...]))
        setUsers(_state, action) {
            // action.type = 'users/setUsers', action.payload = [<user1>, <user2>, etc...]
            return action.payload;
        },
        resetUsers() {
            return initialState;
        },
    },
});

export const { resetUsers, setUsers } = usersSlice.actions;

export const initializeUsers = () => async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
};

export default usersSlice.reducer;
