import {ActionTypes} from "../constants/actionTypes";
import {ConfigLevel} from "../constants/configLevel";
import * as ConfigService from "../services/configService";
import {ConfigProperty, Organization} from "../store/store";

export const getFirmwareFiles = () => async (dispatch:any) => {
    const files = ['test', 'tesst'];

    dispatch({
        type: ActionTypes.GET_FIRMWARE_FILES,
        files
    });
};

export const addFirmwareFiles = (files: string[]) => async (dispatch:any) => {
    dispatch({
        type: ActionTypes.ADD_FIRMWARE_FILES,
        files
    });
};

export const deleteFirmwareFile = (filename: string) => async (dispatch:any) => {
    dispatch({
        type: ActionTypes.DELETE_FIRMWARE_FILE,
        filename
    });
};