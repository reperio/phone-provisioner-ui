import {ActionTypes} from '../constants/actionTypes';
import {initialState} from './initialState';
import {FirmwareSettings} from "../store/store";

export default function configReducer(state: FirmwareSettings = initialState.firmwareSettings, action: any) {
    let newState: FirmwareSettings = Object.assign({}, state);

    switch (action.type) {
        case ActionTypes.GET_FIRMWARE_FILES:
            newState.files = action.files;
            return newState;

        case ActionTypes.ADD_FIRMWARE_FILES:
            newState.files = state.files.concat(action.files);
            return newState;

        case ActionTypes.DELETE_FIRMWARE_FILE:
            const files = [...newState.files];
            const index = files.indexOf(action.filename);
            if(index >= 0) {
                files.splice(index, 1);
                newState.files = files;
            }
            return newState;

        default:
            return state;
    }
}