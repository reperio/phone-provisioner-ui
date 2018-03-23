import { combineReducers } from 'redux';
import configurationSettings from './configReducer';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
    configurationSettings,
    routing
});

const wrapper = (state: any, action: any) => {
    const ret = rootReducer(state, action);
    console.log(ret);
    return ret;
};

export default wrapper;
