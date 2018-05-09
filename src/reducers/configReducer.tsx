import {ActionTypes} from '../constants/actionTypes';
import {initialState} from './initialState';
import {ConfigProperty, ConfigurationSettings, Organization, Store} from "../store/store";
import {ConfigLevel} from "../constants/configLevel";

export default function configReducer(state: ConfigurationSettings = initialState.configurationSettings, action: any) {
    let newState: ConfigurationSettings = Object.assign({}, state);

    switch (action.type) {
        case ActionTypes.GET_MANUFACTURERS:
            if(state.allConfigs.length === 0) {
                newState.allConfigs = action.manufacturers.map(addConfigProps);
            }
            return newState;

        case ActionTypes.EXPAND_CONFIG_GROUP:
            newState.allConfigs = newState.allConfigs.map(
                (c: any) => applyChangesToConfig(c, action.id, expandConfigGroup(action.children))
            );
            return newState;

        case ActionTypes.SELECT_CONFIG:
            const hierarchy = findConfig(newState.allConfigs, action.id);
            if(hierarchy !== null) {
                newState.currentlyEditing = {
                    hierarchy,
                    options: composeConfigOptions(hierarchy)
                };
            }
            return newState;

        case ActionTypes.TOGGLE_PROPERTY_INHERITANCE:
            newState.anyUnsavedChanges = true;
            //Sets state.currentlyEditing.options[action.property].inherited = action.inherit
            return changeConfigOptions(newState, action.property, {inherited: action.inherit});

        case ActionTypes.CHANGE_PROPERTY_VALUE:
            newState.anyUnsavedChanges = true;
            //Sets state.currentlyEditing.options[action.property].value = action.value
            return changeConfigOptions(newState, action.property, {value: action.value});

        case ActionTypes.SAVE_PROPERTY_OPTIONS:
            newState.anyUnsavedChanges = false;
            newState.allConfigs = newState.allConfigs.map(
                (c: any) => applyChangesToConfig(c, action.id, updateModel(action.config))
            );
            return newState;

        case ActionTypes.LOAD_ORGANIZATIONS:
            newState.organizations = action.organizations;
            return newState;

        case ActionTypes.CHANGE_ORGANIZATION:
            newState.currentOrganization = newState.organizations.find((org: Organization) => org.id === action.newOrganization);
            newState.allConfigs = action.manufacturers.map(addConfigProps);
            newState.currentlyEditing = null;
            return newState;

        default:
            return state;
    }
}


function applyChangesToConfig(config: any, id: string, transformation: Function) {
    let newConfig = Object.assign({}, config);
    if(newConfig.id === id) {
        newConfig = transformation(newConfig);
    } else if(newConfig.children !== null) {
        newConfig.children = newConfig.children.map(
            (c: any) => applyChangesToConfig(c, id, transformation)
        );
    }
    return newConfig;
}

const expandConfigGroup = (children: object[]) => (config: any) => {
    config.expanded = !config.expanded;
    if(children !== null) {
        config.children = children.map(addConfigProps);
    }
    return config;
}

const updateModel = (newConf: any) => (config: any) => {
    return Object.assign({}, config, {config: JSON.stringify(newConf)});
}

function addConfigProps(child: object) {
    return Object.assign({expanded: false, children: null}, child);
}

//Finds a config by id and returns an array of the path to it. Ex: [<some manufacturer>, <some family>, <some model>]
//Returns null if none is found
function findConfig(configs: any[], id: string) : any[] {
    for(const conf of configs) {
        if(conf.id === id) {
            return [conf];
        }
        if(conf.children != null) {
            const childConf = findConfig(conf.children, id);
            if(childConf !== null) {
                return [conf].concat(childConf);
            }
        }
    }
    return null;
}

//Converts the db models of the config to the properties that you see
function composeConfigOptions(models: any[]) : {[property: string]: ConfigProperty; } {
    let options: {[property: string]: ConfigProperty; } = {};

    function setProp(configString: string, configLevel: number, isInherited: boolean) {
        const config = JSON.parse(configString);
        for(let prop in config) {
            const val = config[prop];
            let inheritedValue = val;
            //If it's default here, something went wrong. There must have been an invalid config property
            //that was in the default but not the actual config.
            if(!isInherited && prop in options) { //If the value is being overridden, make sure that the inherit level doesn't show the current level
                configLevel = options[prop].inheritLevel;
                inheritedValue = options[prop].inheritedValue;
            }
            options[prop] = new ConfigProperty(isInherited, configLevel, val, inheritedValue);
        }
    }

    for(let i = 0; i < models.length; i++) {
        setProp(models[i].default_config, ConfigLevel.DEFAULT, true);
        setProp(models[i].config, i, i < models.length - 1);
    }

    return options;
}

function changeConfigOptions(state: ConfigurationSettings, configProperty: string, propsToChange: object) : ConfigurationSettings {
    let newOptions : any = {};
    Object.keys(state.currentlyEditing.options).map((key: string) => {
        let option = state.currentlyEditing.options[key];
        if(key === configProperty) {
            option = Object.assign({}, option, propsToChange);
        }
        newOptions[key] = new ConfigProperty(option.inherited, option.inheritLevel, option.value, option.inheritedValue);
    });
    const newState = Object.assign({}, state.currentlyEditing);
    newState.options = newOptions;
    state.currentlyEditing = newState;
    return state;
}