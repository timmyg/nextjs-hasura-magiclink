import * as types from './types'

export const setText  = (text) => (dispatch) => {
  console.log(text);
  dispatch({ type: types.SET_TEXT, payload: { text } })
}
export const addActivity  = (x) => (dispatch) => {
    dispatch({ type: types.ADD_ACTIVITY, payload: { text: "text321" } })
}
