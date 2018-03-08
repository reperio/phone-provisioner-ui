import {ActionTypes} from '../constants/actionTypes';
import initialState from './initialState';

export default function configReducer(state = initialState.configurationSettings, action: any) {
    let newState:any = Object.assign({}, state);

    switch (action.type) {
        case ActionTypes.GET_MANUFACTURERS:
            newState.allConfigs = action.manufacturers.map(addConfigProps);
            return newState;
        case ActionTypes.EXPAND_CONFIG_GROUP:
            newState.allConfigs = newState.allConfigs.map(
                (c: any) => applyChangesToConfig(c, action.id, expandConfigGroup(action.children))
            );
            return newState;
        case ActionTypes.ADD_CONFIG_GROUP:
            if(action.parentId == null) {
                newState.allConfigs = newState.allConfigs.concat(addConfigProps(action.newGroup));
            } else {
                newState.allConfigs = newState.allConfigs.map(
                    (c: any) => applyChangesToConfig(c, action.parentId, addConfigGroup(action.newGroup))
                );
            }
            return newState;
    default:
        return state;
    }
}


function applyChangesToConfig(config: any, id: string, transformation: Function) {
    var newConfig = Object.assign({}, config);
    if(newConfig.id == id) {
        newConfig = transformation(newConfig);
    } else if(newConfig.children != null) {
        newConfig.children = newConfig.children.map(
            (c: any) => applyChangesToConfig(c, id, transformation)
        );
    }
    return newConfig;
}

const expandConfigGroup = (children: any) => (config: any) => {
    config.expanded = !config.expanded;
    if(children != null) {
        config.children = children.map(addConfigProps);
    }
    return config;
}

const addConfigGroup = (newGroup: any) => (config: any) => {
    config.children = config.children.concat(addConfigProps(newGroup));
    return config;
}

function addConfigProps(child: any) {
    return Object.assign({expanded: false, children: null}, child);
}