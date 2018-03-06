import {ActionTypes} from '../constants/actionTypes';
import initialState from './initialState';

export default function configReducer(state = initialState.configurationSettings, action: any) {
    let newState:any = Object.assign({}, state);

    switch (action.type) {
        case ActionTypes.GET_MANUFACTURERS:
        newState.allConfigs = action.manufacturers.map(
            (m: any) => Object.assign({expanded: false, chidren: null}, m)
        );
        return newState;
    case ActionTypes.EXPAND_CONFIG_GROUP:
        newState[action.field] = action.message;
        return newState;
    default:
        return state;
    }
}

