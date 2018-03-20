import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';

class ConfigurationEditor extends React.Component {
    props: any;
    static propTypes: any;

    render() {
        return (
            <div>
                <h2>Edit config</h2>
                {this.props.configs != null && <p>{this.props.configs.map((c: any) => c.name).join(' > ')}</p>}
            </div>
        );
    }
}

ConfigurationEditor.propTypes = {
    actions: PropTypes.object,
    configs: PropTypes.arrayOf(PropTypes.object)
};

function mapDispatchToProps(dispatch:any) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigurationEditorContainer = connect<any, any, any>(
    null,
    mapDispatchToProps
)(ConfigurationEditor);
