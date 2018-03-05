import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/testActions';
import ConfigurationGroupContainer from './configurationGroupContainer';
import ConfigurationEditor from './configurationEditor';

export class ConfigurationsPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Global Configuration</h1>
                <br/>
                <br/>
                <div className="col-md-4"><ConfigurationGroupContainer/></div>
                <div className="col-md-8"><ConfigurationEditor/></div>
            </div>
        );
    }
}