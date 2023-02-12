import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", succeeded: "" };

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        // dispatch(setNotificationSuccess('howdy'))
        setNotificationSuccess(state, action) {
            // action.type = 'notification/setNotificationSuccess', action.payload = 'howdy'
            return { message: action.payload, succeeded: true };
        },
        // dispatch(setNotificationSuccess('blah'))
        setNotificationFail(state, action) {
            // action.type = 'notification/setNotificationFail', action.payload = 'blah'
            return { message: action.payload, succeeded: false };
        },
        resetNotification() {
            return initialState;
        },
    },
});

export const {
    resetNotification,
    setNotificationFail,
    setNotificationSuccess,
} = notificationSlice.actions;

export default notificationSlice.reducer;
