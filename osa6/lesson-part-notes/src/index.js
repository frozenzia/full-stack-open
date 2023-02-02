import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'

import './index.css'
import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  }
})

console.log('store.getState(): ', { value: store.getState() })

const root = createRoot(document.getElementById('root'))
const renderApp = () => root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

renderApp()
// store.subscribe(renderApp)
