import {ActionTypes} from '../constants/actionTypes';
import initialState from './initialState';

export default function configReducer(state = initialState.configurationSettings, action: any) {
    let newState:any = Object.assign({}, state);

    switch (action.type) {
        case ActionTypes.GET_MANUFACTURERS:
        newState.allConfigs = action.manufacturers.map(addConfigProps);
        return newState;
    case ActionTypes.EXPAND_CONFIG_GROUP:
        newState.allConfigs = newState.allConfigs.map((c: any) => expandConfigGroup(c, action.id, action.children));
        return newState;
    default:
        return state;
    }
}

function expandConfigGroup(config: any, id: string, children: any) {
    if(config.id == id) {
        config.expanded = !config.expanded;
        if(children != null) {
            config.children = children.map(addConfigProps);
        }
    } else if(config.children != null) {
        config.children = config.children.map(
            (c: any) => expandConfigGroup(c, id, children)
        );
    }
    return config;
}

function addConfigProps(child: any) {
    return Object.assign({expanded: false, children: null}, child);
}