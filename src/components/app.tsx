/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';
import StatusPage from './statusPage';
import TestPage from './testPage';
import {TestPageReact} from './testPageReact';
import NotFoundPage from './notFoundPage';
import {HelloWorld} from './HelloWorld';
import {ConfigurationsPageContainer} from './configuration/pages/configurationsPage';
import {FirmwarePageContainer} from "./firmware/firmwarePage";

export class App extends React.Component {
    render() {
        const activeStyle = { color: 'red' };
        return (
            <div className="app-main">
                <div className="app-sidebar">
                    <NavLink exact to="/" activeStyle={activeStyle}>Status</NavLink><br/>
                    <NavLink exact to="/testRedux" activeStyle={activeStyle}>Test Redux</NavLink><br/>
                    <NavLink exact to="/testReact" activeStyle={activeStyle}>Test React</NavLink><br/>
                    <NavLink exact to="/nowhere" activeStyle={activeStyle}>Test default route</NavLink><br/>
                    <NavLink exact to="/hello" activeStyle={activeStyle}>Hello</NavLink><br/>
                    <NavLink exact to="/configurations" activeStyle={activeStyle}>Configurations</NavLink><br/>
                    <NavLink exact to="/firmware" activeStyle={activeStyle}>Firmware Files</NavLink><br/>
                </div>
                <div className="app-content">
                    <Switch>
                        <Route exact path="/" component={StatusPage} />
                        <Route exact path="/testRedux" component={TestPage} />
                        <Route exact path="/testReact" component={TestPageReact} />
                        <Route exact path="/hello" component={HelloWorld} />
                        <Route exact path="/configurations" component={ConfigurationsPageContainer}/>
                        <Route exact path="/firmware" component={FirmwarePageContainer}/>
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}
