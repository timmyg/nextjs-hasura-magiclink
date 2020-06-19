import * as types from './types'

// app
export const setTab = index => ({
  type: types.SET_TAB,
  payload: index
});

// activities

export const addActivity  = (activityText, babyId) => {
  return dispatch => {
    dispatch(addActivityStarted());
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        {
          "query":"mutation insert_single_activity($object: activities_insert_input! ) {insert_activities_one(object: $object) { id type baby_id created_at updated_at start_at }}",
          "variables": {
            "object": {
              type: activityText,
              baby_id: babyId
            }
          },
          "operationName":"insert_single_activity"}
      ),
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.errors) {
        dispatch(addActivityFailure(json.errors));
      } else {
        dispatch(addActivitySuccess(json.data.insert_activities_one));
      }
    })
  }
}

export const deleteActivity  = (activity) => {
  return dispatch => {
    dispatch(deleteActivityStarted());
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        {
          "query":"mutation { delete_activities_by_pk(id:" + activity.id + ") { id type } }"
        }
      ),
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.errors) {
        dispatch(deleteActivityFailure(json.errors));
      } else {
        dispatch(deleteActivitySuccess(json.data.delete_activities_by_pk));
      }
    })
  }
}

export const getActivities  = () => {
  return dispatch => {
    dispatch(getActivitiesStarted());
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        {
          "query": "query { activities(order_by: {start_at: desc}) { id type start_at } }",
        },
      ),
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.errors) {
        dispatch(getActivitiesFailure(json.errors));
      } else {
        dispatch(getActivitiesSuccess(json.data.activities));
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