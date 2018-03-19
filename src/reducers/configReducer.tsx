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
            const hierarchy = findConfig(newState.allConfigs, action.id);
            if(hierarchy != null) {
                newState.currentlyEditing = {
                    hierarchy,
                    options: {
                        test: {inherited: false, value: false, inheritedValue: false},
                        test2: {inherited: false, value: "test", inheritedValue: false}
                    }
                };
            }
            return newState;

        case ActionTypes.TOGGLE_PROPERTY_INHERITANCE:
            //Sets state.currentlyEditing.options[action.property].inherited = action.inherit
            let newOptions = Object.assign({}, newState.currentlyEditing.options);
            newOptions[action.property] = Object.assign({}, newOptions[action.property], {inherited: action.inherit});
            newState.currentlyEditing = Object.assign({}, newState.currentlyEditing, {options: newOptions});
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