import {ActionTypes} from "../constants/actionTypes";
import {ConfigLevel} from "../constants/configLevel";
import * as ConfigService from "../services/configService";
import {ConfigProperty} from "../store/store";

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

export const selectConfig = (id: string) => async (dispatch:any) => {
    dispatch({
        type: ActionTypes.SELECT_CONFIG,
        id
    });
};

export const togglePropertyInheritance = (property: string, inherit: boolean) => async (dispatch:any) => {
    dispatch({
        type: ActionTypes.TOGGLE_PROPERTY_INHERITANCE,
        property,
        inherit
    });
};

export const changePropertyValue = (property: string, value: any) => async (dispatch:any) => {
    dispatch({
        type: ActionTypes.CHANGE_PROPERTY_VALUE,
        property,
        value
    });
};

export const savePropertyOptions = (options: {[property: string]: ConfigProperty; }, configLevel: ConfigLevel, id: string) => async (dispatch:any) => {
    await ConfigService.updateConfig(configLevel, id, configFromOptions(options));

    dispatch({
        type: ActionTypes.SAVE_PROPERTY_OPTIONS
    });
};

function configFromOptions(options: {[property: string]: ConfigProperty; }) : any {
    let config: any = {};
    for(let prop in options) {
        if(!options[prop].inherited) {
            config[prop] = options[prop].value;
        }
    }
    return config;
}