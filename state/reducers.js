import { combineReducers } from 'redux'
import * as types from './types'

const initialFormState = {
  loading: false,
  activities: [],
  error: null
}

const formReducer = (state = initialFormState, { type, payload }) => {
  switch (type) {
    case types.ADD_ACTIVITY:
      return {
        ...state,
        loading: true
      }
    case types.ADD_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        activities: [...state.activities, payload]
      }
    case types.ADD_ACTIVITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error
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
