import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import axios from 'axios';

const test = handleActions({
  [actions.increment](state, { payload : { task }}) {
    const { value } = state;
    return {
      ...state,
      value: value + 1
    }
  },
  [actions.testRequest](state){
    return state
  },
  [actions.testFailure](state){
    return state
  },
  [actions.testSuccess](state, {payload: { data }}) {
    console.log(data);
    const { items } = state;
    return {
      ...state,
      items: data
    }
  }
}, {value: 0, items: []});


export default combineReducers({
  test
})
