import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        // dispatch(setNotificationText('howdy'))
        setNotificationText(state, action) { // action.type = 'notification/setNotification', action.payload = 'howdy'
            return action.payload
        },
        resetNotificationText() {
            return ''
        }
    }
})

export const { setNotificationText, resetNotificationText } = notificationSlice.actions


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
export const setNotification = (text, timeInSeconds) => {
    return async (dispatch/*, getState*/) => {
        dispatch(setNotificationText(text))
        await timeout(timeInSeconds * 1000)
        dispatch(resetNotificationText())
    }
}

export default notificationSlice.reducer
