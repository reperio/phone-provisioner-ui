import {ActionTypes} from "../constants/actionTypes";
import {ConfigLevel} from "../constants/configLevel";
import * as ConfigService from "../services/configService";

export const fetchManufacturers = () => async (dispatch:any) => {
    const manufacturers = await ConfigService.getManufacturers();

    dispatch({
        type: ActionTypes.GET_MANUFACTURERS,
        manufacturers: manufacturers
    });
};

export const expandConfigGroupInitialLoad = (configLevel: ConfigLevel, elementId: string) => async (dispatch:any) => {
    const children = await ConfigService.getChildren(configLevel, elementId);

    dispatch({
        type: ActionTypes.EXPAND_CONFIG_GROUP,
        children,
        id: elementId
    });
};

export const expandConfigGroup = (elementId: string) => async (dispatch:any) => {
    dispatch({
        type: ActionTypes.EXPAND_CONFIG_GROUP,
        children: null,
        id: elementId
    });
};

export const addConfigGroup = (configLevel: ConfigLevel, name: string, parentId: string) => async (dispatch:any) => {
    const newGroup = await ConfigService.createConfigGroup(configLevel, name, parentId);

    dispatch({
        type: ActionTypes.ADD_CONFIG_GROUP,
        parentId,
        newGroup
    });
};

export const selectConfig = (id: string) => async (dispatch:any) => {
    dispatch({
        type: ActionTypes.SELECT_CONFIG,
        id
    });
};