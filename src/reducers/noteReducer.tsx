import {ActionTypes} from '../constants/actionTypes';
import {initialState} from './initialState';

//note the mapping of the initial state property here
export default function noteReducer(state = initialState.note, action: any) {
  

  switch (action.type) {
    case ActionTypes.UPDATE_NOTE: {
      let fieldName = action.field;
      let stateModifier = {[fieldName]: action.value};
      return Object.assign({}, state, stateModifier);
    }
    case ActionTypes.ADD_NOTE: {
      let newState:any = Object.assign({}, state);
      newState.noteList = [];

      for (let note of state.noteList) {
        newState.noteList.push(note);
      }

      newState.noteList.push(action.note);
      
      return newState;
    }
    default:
      return state;
  }
}

