import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'

import './index.css'
import App from './App'
import noteReducer from './reducers/noteReducer'

const store = configureStore({ reducer: noteReducer })

store.dispatch({
    type: 'NEW_NOTE',
    data: {
      content: 'the app state is in redux store',
      important: true,
      id: 1
    }
})
  
store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const root = createRoot(document.getElementById('root'))
const renderApp = () => root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

renderApp()
// store.subscribe(renderApp)
