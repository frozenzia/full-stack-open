import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit'

import constants from './constants'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case constants.ACTIONS.INCREMENT:
      return state + 1
    case constants.ACTIONS.DECREMENT:
      return state - 1
    case constants.ACTIONS.ZERO:
      return 0
    default:
      return state
  }
}

const store = configureStore({ reducer: counterReducer })

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>
)}

renderApp()
store.subscribe(renderApp)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
