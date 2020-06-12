import { combineReducers } from 'redux'
import * as types from './types'

const initialFormState = {
  text: null,
}

const formReducer = (state = initialFormState, { type, payload }) => {
  switch (type) {
    // case types.ADD_ACTIVITY:
    case types.SET_TEXT:
        return {
          text: payload.text
        }
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  form: formReducer,
}

export default combineReducers(reducers)
