import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';

class ConfigurationEditor extends React.Component {
    props: any;
    static propTypes: any;

    render() {
        let editorBody = null;
        if(this.props.configs != null) {
            try {
                const currentConfig = this.props.configs.hierarchy[this.props.configs.hierarchy.length - 1];
                editorBody = React.createElement
                    (require(`./${currentConfig.component_name}`).container, {options: this.props.configs.options}, null);
            } catch {
                editorBody = (<p>CONFIG PAGE NOT FOUND</p>);
            }
        }

        return (
            <div>
                <h2>Edit config</h2>
                {this.props.configs != null && <p>{this.props.configs.hierarchy.map((c: any) => c.name).join(' > ')}</p>}
                {editorBody}
            </div>
        );
    }
}

ConfigurationEditor.propTypes = {
    actions: PropTypes.object,
    configs: PropTypes.object
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
