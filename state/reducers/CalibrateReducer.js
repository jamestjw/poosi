import firebase from '../../Firebase';
import { combineReducers } from 'redux';

const INITIAL_STATE = {
  loading: false,
  current: 0,
  id: [],
  uri: [],
  rating: null,
  idx: []
};

const calibrateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_RATING':
      return { ...state, rating: action.payload}
    case 'SUBMITTED_RATING':
      return { ...state, rating: null, current: state.current+1, loading: false}
    case "LOADING_PHASE":
      console.log('Loading')
      return { ...state, loading: true }
    case "FETCH_SUCCESS":
      return { ... state, loading: false, id: action.payload.id, uri: action.payload.uri, idx: action.payload.arr }

    default:
      return state
  }
};

export default combineReducers({
  calibrate: calibrateReducer,
});