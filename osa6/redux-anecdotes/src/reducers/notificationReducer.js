import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        // dispatch(setNotification('howdy'))
        setNotification(state, action) { // action.type = 'notification/setNotification', action.payload = 'howdy'
            return action.payload
        },
        resetNotification() {
            return ''
        }
    }
})

export const { setNotification, resetNotification } = notificationSlice.actions

export default notificationSlice.reducer