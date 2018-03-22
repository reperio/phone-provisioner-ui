import { combineReducers } from 'redux';
import configurationSettings from './configReducer';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
    configurationSettings,
    routing
});

export default rootReducer;
