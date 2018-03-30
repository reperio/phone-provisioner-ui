import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import configureStore, { history } from './store/configureStore'
import {App} from './components/app'
import 'font-awesome-sass-loader';
import './styles/app.scss'
import 'rc-time-picker/assets/index.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)