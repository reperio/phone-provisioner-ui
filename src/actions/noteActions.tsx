import {ActionTypes} from '../constants/actionTypes';
import {TestService} from '../services/testService'

export function handleUpdate(field: string, value: string) {
  return {
      type: ActionTypes.UPDATE_NOTE,
      field,
      value
  };
}

export function addNote(note: string) {
    return {
        type: ActionTypes.ADD_NOTE,
        note
    };
}