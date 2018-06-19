import {ActionTypes} from "../constants/actionTypes";
import {ConfigLevel} from "../constants/configLevel";
import * as FirmwareService from "../services/firmwareService";
import {ConfigProperty, Organization} from "../store/store";

export const getFirmwareFiles = () => async (dispatch:any) => {
    const files = await FirmwareService.getFiles();

    dispatch({
        type: ActionTypes.GET_FIRMWARE_FILES,
        files
    });
};

export const addFirmwareFiles = (files: FileList) => async (dispatch:any) => {
    await FirmwareService.addFiles(files);

    let filenames = [];
    for(let i = 0; i < files.length; i++) {
        filenames.push(files[i].name);
    }

    dispatch({
        type: ActionTypes.ADD_FIRMWARE_FILES,
        files: filenames
    });
};

export const deleteFirmwareFile = (filename: string) => async (dispatch:any) => {
    await FirmwareService.deleteFile(filename);

    dispatch({
        type: ActionTypes.DELETE_FIRMWARE_FILE,
        filename
    });
};