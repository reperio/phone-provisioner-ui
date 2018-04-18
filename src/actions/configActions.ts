import {ActionTypes} from "../constants/actionTypes";
import {ConfigLevel} from "../constants/configLevel";
import * as ConfigService from "../services/configService";
import {ConfigProperty, Organization} from "../store/store";

export const initialConfigLoad = () => async (dispatch:any) => {
    const manufacturers = await ConfigService.getManufacturers();

    dispatch({
        type: ActionTypes.GET_MANUFACTURERS,
        manufacturers
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

export const selectConfig = (id: string, save: boolean, options: {[property: string]: ConfigProperty; }, configLevel: ConfigLevel, oldId: string) => async (dispatch:any) => {
    if(save) {
        await savePropertyOptions(options, configLevel, oldId)(dispatch);
    }

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
    const config = ConfigService.configFromOptions(options);
    await ConfigService.updateConfig(configLevel, id, config);

    dispatch({
        type: ActionTypes.SAVE_PROPERTY_OPTIONS,
        config,
        id
    });
};

export const fetchOrganizations = () => async (dispatch:any) => {
    const organizations: Organization[] = [];

    dispatch({
        type: ActionTypes.LOAD_ORGANIZATIONS,
        organizations
    });
};

export const changeOrganization = (id: string) => async (dispatch:any) => {
    dispatch({
        type: ActionTypes.CHANGE_ORGANIZATION,
        id
    });
};