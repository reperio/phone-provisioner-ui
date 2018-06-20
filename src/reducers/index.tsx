import { combineReducers } from 'redux';
import configurationSettings from './configReducer';
import firmwareSettings from './firmwareReducer';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
    configurationSettings,
    firmwareSettings,
    routing
});

export default rootReducer;
