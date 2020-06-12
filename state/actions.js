import * as types from './types'

export const setText  = (text) => (dispatch) => {
  dispatch({ type: types.SET_TEXT, payload: { text } })
}
export const addActivity  = (form) => (dispatch) => {
  dispatch({ type: types.ADD_ACTIVITY, payload: { activity: form.activity } })
}
 