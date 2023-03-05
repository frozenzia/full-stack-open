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

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
export const setNotification = (text, isSuccess, timeInSeconds) => {
    return async (dispatch /*, getState*/) => {
        dispatch(
            isSuccess ? setNotificationSuccess(text) : setNotificationFail(text)
        );
        await timeout(timeInSeconds * 1000);
        dispatch(resetNotification());
    };
};

export default notificationSlice.reducer;
