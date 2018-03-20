import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigurationGroupListContainer} from './configurationGroupList';
import {ConfigurationEditorContainer} from './configurationEditor';
import {ConfigLevel} from "../../constants/configLevel";
import {Store, ConfigurationSettings} from "../../store/store";

interface IComponentProps {
    actions?: any;
    configurationSettings?: ConfigurationSettings;
}

class ConfigurationsPage extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    constructor(props: IComponentProps) {
        super(props);
        this.props.actions.fetchManufacturers();
    }

    render() {
        const editing = this.props.configurationSettings.currentlyEditing;

        return (
            <div>
                <h1>Global Configuration</h1>
                <br/>
                <br/>
                <div className="col-md-4">
                    <table className={'tree-grid'}>
                        <tbody>
                            <ConfigurationGroupListContainer configs={this.props.configurationSettings.allConfigs}
                                                             configLevel={ConfigLevel.MANUFACTURER}
                                                             selectedId={editing == null ? null : editing.hierarchy[editing.hierarchy.length - 1].id}/>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-8">
                    <ConfigurationEditorContainer configs={editing}/>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state: Store) : IComponentProps {
    return {
        configurationSettings: state.configurationSettings
    };
}

function mapDispatchToProps(dispatch: any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigurationsPageContainer = connect<IComponentProps, IComponentProps, IComponentProps, Store>(
    mapStateToProps,
    mapDispatchToProps
)(ConfigurationsPage);