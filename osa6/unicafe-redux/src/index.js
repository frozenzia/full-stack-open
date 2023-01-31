import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './reducer'

import './index.css'

const store = configureStore({ reducer: counterReducer })
const root = ReactDOM.createRoot(document.getElementById('root'))

const App = () => {

    const actionTypes = {
        GOOD: 'GOOD',
        OK: 'OK',
        BAD: 'BAD',
        ZERO: 'ZERO',
    }

    return (
        <div>
            <h1>give feedback</h1>

            {Object.keys(actionTypes).map((aKey) => (
                <button key={aKey} onClick={() => store.dispatch({ type: aKey })}>
                    {aKey.toLowerCase()}
                </button>
            ))}

            <h1>statistics</h1>
            <div>good: {store.getState().good}</div>
            <div>neutral: {store.getState().ok}</div>
            <div>bad: {store.getState().bad}</div>
        </div>
    )
}

const renderApp = () => {
    root.render(
        <App />
    )
}

renderApp()
store.subscribe(renderApp)