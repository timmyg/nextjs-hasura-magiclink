import { combineReducers } from 'redux'
import * as types from './types'
import InputForm from '../components/inputForm'

const initialAppState = {
  selectedIndex: 0,
  tabs: [
    {name: 'Add Activity', renderComponent() { return  <InputForm/> } },
    {name: 'View Activity', renderComponent() {} },
    {name: 'Trends', disabled: true, renderComponent() {} }
  ]
}


const initialFormState = {
  loading: false,
  allActivities: [],
  activities: [],
  activityFilter: null,
  error: null
}

const appReducer = (state = initialAppState, { type, payload }) => {
  switch (type) {

    case types.SET_TAB:
      return {
        ...state,
        selectedIndex: payload
      }

    default:
      return state
  }
}
const formReducer = (state = initialFormState, { type, payload }) => {
  switch (type) {

    case types.ADD_ACTIVITY_STARTED:
    case types.DELETE_ACTIVITY_STARTED:
    case types.GET_ACTIVITIES_STARTED:
      return {
        ...state,
        loading: true
      }

    case types.ADD_ACTIVITY_SUCCESS: 
      const allActivities = [...state.allActivities.slice(), payload]
      const allActivitiesSorted = allActivities.sort((a, b) => {
        return b.start_at.localeCompare(a.start_at)
      })
      const activities = state.activityFilter ? state.allActivities.filter(activity =>
        activity.type.toLowerCase().includes(state.activityFilter.toLowerCase())) : allActivities
      return {
        ...state,
        loading: false,
        error: null,
        allActivities: allActivitiesSorted,
        activities
      }
    case types.DELETE_ACTIVITY_SUCCESS: 
      console.log({payload});
      return {
        ...state,
        loading: false,
        error: null,
        allActivities: state.allActivities.filter(a => a.id !== payload.id),
        activities: state.activities.filter(a => a.id !== payload.id)
      }
    case types.GET_ACTIVITIES_SUCCESS:
      const allActivitiesSorted2 = payload.sort((a, b) => b.start_at - a.start_at)
      return {
        ...state,
        loading: false,
        error: null,
        allActivities: allActivitiesSorted2,
        activities: state.activityFilter ? allActivitiesSorted2.filter(activity =>
          activity.type.toLowerCase().includes(state.activityFilter.toLowerCase())) : allActivitiesSorted2
      }
    case types.SET_ACTIVITIES_FILTER:
      console.log(payload);
      return {
        ...state,
        activityFilter: payload,
        activities: !!payload ? state.allActivities.filter(activity =>
          activity.type.toLowerCase().includes(payload.toLowerCase())) : state.allActivities
      }

    case types.ADD_ACTIVITY_FAILURE:
    case types.DELETE_ACTIVITY_FAILURE:
    case types.GET_ACTIVITIES_FAILURE:
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
  activityForm: formReducer,
  app: appReducer,
}

export default combineReducers(reducers)
