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
        case ActionTypes.SELECT_CONFIG:
            newState.currentlyEditing = findConfig(newState.allConfigs, action.id);
            return newState;
        default:
            return state;
    }
}


function applyChangesToConfig(config: any, id: string, transformation: Function) {
    let newConfig = Object.assign({}, config);
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

function addConfigProps(child: any) {
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
            if(childConf != null) {
                return [conf].concat(childConf);
            }
        }
    }
    return null;
}