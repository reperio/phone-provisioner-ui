import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {CurrentlyEditing} from "../../store/store";

interface IComponentProps {
    actions?: any;
    configs?: CurrentlyEditing;
}

class ConfigurationEditor extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

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

function mapDispatchToProps(dispatch:any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigurationEditorContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(ConfigurationEditor);
