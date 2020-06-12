import * as types from './types'
import axios from "axios";
import useMagicLink from 'use-magic-link'

export const setText  = (text) => (dispatch) => {
  dispatch({ type: types.SET_TEXT, payload: { text } })
}
export const addActivity  = (activityText) => {
  return dispatch => {
    const auth = useMagicLink(process.env.NEXT_PUBLIC__MAGIC_LINK_PUBLISHABLE_KEY);
    console.log(auth.fetch)
    dispatch(addActivityStarted());
    axios
      .post(`https://poopasaurus-timmyg.herokuapp.com/v1/graphql`, 
        {"query":"mutation insert_single_activity {\n  insert_activities_one(\n    object: {\n      type: \"" + activityText +"\",\n      baby_id: 1\n    }\n  ) {\n    type\n    baby_id\n    created_at\n    updated_at\n  }\n}","variables":null,"operationName":"insert_single_activity"},
        { headers: {"x-hasura-admin-secret": 'Z6b;jJtuU82ZJWkv8ribLZLNj,'} }
      )
      .then(res => {
        console.log({res});
        if (res.data.errors) {
          dispatch(addActivityFailure(res.errors));
        } else {
          dispatch(addActivitySuccess(res.data));
        }
      })
  };
}
 
const addActivitySuccess = activity => ({
  type: types.ADD_ACTIVITY_SUCCESS,
  payload: {
    ...activity
  }
});

const addActivityStarted = () => ({
  type: types.ADD_ACTIVITY
});

const addActivityFailure = error => ({
  type: types.ADD_ACTIVITY_FAILURE,
  payload: {
    error
  }
});