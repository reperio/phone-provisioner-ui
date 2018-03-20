import{ActionTypes} from '../constants/actionTypes';
import {initialState} from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function testReducer(state = initialState.test, action: any) {
  let newState:any = Object.assign({}, state);

  switch (action.type) {
    case ActionTypes.TEST:
      newState[action.field] = action.message;
      return newState;
    case ActionTypes.TEST2:
      newState[action.field] = action.message;
      return newState;
    default:
      return state;
  }
}

