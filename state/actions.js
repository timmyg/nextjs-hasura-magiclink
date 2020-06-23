import * as types from './types'
import moment from 'moment'
import useMagicLink from 'use-magic-link'

const headers = {
  'Content-type': 'application/json',
  "x-hasura-admin-secret": process.env.NEXT_PUBLIC__HASURA_GRAPHQL_ADMIN_SECRET
  // 'X-Hasura-Role': "user",
  // 'X-Hasura-User-ID': 1
  // 'Authorization': "Bearer eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImVkaXRvciIsInVzZXIiLCJtb2QiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiIxIn0sImFsZyI6IkhTMjU2In0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.BY71DAPP6W-IHGEX1hrcPGqwPvDIaD5oxjOn8Fdsh_8"
}
// const auth = useMagicLink(process.env.NEXT_PUBLIC__MAGIC_LINK_PUBLISHABLE_KEY);

// app
export const setTab = index => ({
  type: types.SET_TAB,
  payload: index
});

// activities

export const addActivity  = (activityFullText, babyId) => {
  return dispatch => {
    dispatch(addActivityStarted());
    const words = activityFullText.split(" ")
    const activityText = words[0]
    if (!["poop", "feed"].includes(activityText.toLowerCase())) {
      return dispatch(addActivityFailure("Invalid input"));
    }
    const activity = {
      type: activityText,
      text: activityFullText,
      baby_id: babyId
    }
    if(words.includes("at")) {
      const timeText = words[2]
      activity.start_at = moment(timeText, "hmma").utc().format()
    }
    fetch(process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        {
          "query":"mutation insert_single_activity($object: activities_insert_input! ) {insert_activities_one(object: $object) { id type baby_id created_at updated_at start_at }}",
          "variables": {
            "object": activity
          },
          "operationName":"insert_single_activity"}
      ),
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.data) {
        dispatch(addActivitySuccess(json.data.insert_activities_one));
      } else {
        dispatch(addActivityFailure(json.errors));
      }
    })
  }
}

export const deleteActivity  = (activity) => {
  return dispatch => {
    dispatch(deleteActivityStarted());
    fetch(process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        {
          "query":"mutation { delete_activities_by_pk(id:" + activity.id + ") { id type } }"
        }
      ),
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.data) {
        dispatch(deleteActivitySuccess(json.data.delete_activities_by_pk));
      } else {
        dispatch(deleteActivityFailure(json.errors));        
      }
    })
  }
}

export const getActivities  = () => {
  return dispatch => {
    dispatch(getActivitiesStarted());
    fetch(process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        {
          "query": "query { activities(order_by: {start_at: desc}) { id type start_at } }",
        },
      ),
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.data) {
        dispatch(getActivitiesSuccess(json.data.activities));
      } else {
        dispatch(getActivitiesFailure(json.errors));
      }
    })
  }
}
 
const addActivityStarted = () => ({
  type: types.ADD_ACTIVITY_STARTED
});

const addActivitySuccess = activity => ({
  type: types.ADD_ACTIVITY_SUCCESS,
  payload: {
    ...activity
  }
});

const addActivityFailure = error => ({
  type: types.ADD_ACTIVITY_FAILURE,
  payload: {
    error
  }
});

const deleteActivityStarted = () => ({
  type: types.DELETE_ACTIVITY_STARTED
});

const deleteActivitySuccess = activity => ({
  type: types.DELETE_ACTIVITY_SUCCESS,
  payload: {
    ...activity
  }
});

const deleteActivityFailure = error => ({
  type: types.DELETE_ACTIVITY_FAILURE,
  payload: {
    error
  }
});

const getActivitiesStarted = () => ({
  type: types.GET_ACTIVITIES_STARTED,
});

const getActivitiesSuccess = activities => ({
  type: types.GET_ACTIVITIES_SUCCESS,
  payload: activities
});

const getActivitiesFailure = error => ({
  type: types.GET_ACTIVITIES_FAILURE,
  payload: {
    error
  }
});

export const setActivitiesFilter = text => ({
  type: types.SET_ACTIVITIES_FILTER,
  payload: text
});