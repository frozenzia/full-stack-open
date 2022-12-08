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

export default store