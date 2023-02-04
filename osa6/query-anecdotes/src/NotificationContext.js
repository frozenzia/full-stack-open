import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

export const notificationReducer = (state, action) => {
    switch (action.type) {
    case "SET":
        return action.payload
    case "RESET":
        return ''
    default:
        return state
    }
}

export const NotificationContextProvider = (props) => {
    const [notificationText, notificationTextDispatch] = useReducer(notificationReducer, '')
    return (
        <NotificationContext.Provider value={[notificationText, notificationTextDispatch] }>
          {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const textAndDispatch = useContext(NotificationContext)
    return textAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const textAndDispatch = useContext(NotificationContext)
    return textAndDispatch[1]
}

export default NotificationContext