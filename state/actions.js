import * as types from './types'

export const startClock = () => (dispatch) =>
  setInterval(() => {
    dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } })
  }, 1000)

export const incrementCount = () => ({ type: types.INCREMENT })
export const decrementCount = () => ({ type: types.DECREMENT })
export const resetCount = () => ({ type: types.RESET })
export const addActivity  = () => (dispatch) =>
    dispatch({ type: types.ADD_ACTIVITY, payload: { text: "text321" } })
