import {ActionTypes} from '../constants/actionTypes';
import {TestService} from '../services/testService'

export function test(field: string, message: string) {
    return {
        type: ActionTypes.TEST,
        field,
        message
    };
}


export const test2 = (value1:string, value2:number) => async (dispatch:any) => {
  // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
  const service = new TestService();
  const result = await service.getTestMessage();
    
  dispatch({
    type: ActionTypes.TEST2,
    field: 'testAsyncMessage',
    message: result.data.message
  });
};


//expanded with functions, equivalent to test2, shown for example
export const test3 = function(value1:string, value2:number) {
  return async function (dispatch:any) {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    const service = new TestService();
    const result = await service.getTestMessage();
      
    dispatch({
      type: ActionTypes.TEST2,
      field: 'testAsyncMessage',
      message: result.data.message
    });
  }
};