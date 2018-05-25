import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigurationGroupListContainer} from '../tree/configurationGroupList';
import {ConfigurationEditorContainer} from '../configurationEditor';
import {ConfigLevel} from "../../../constants/configLevel";
import {Store, ConfigurationSettings} from "../../../store/store";
import {ChangeOrganizationContainer} from "../changeOrganization";

interface IComponentProps {
    actions?: any;
    configurationSettings?: ConfigurationSettings;
}

class ConfigurationsPage extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    constructor(props: IComponentProps) {
        super(props);
        if(this.props.configurationSettings.allConfigs.length === 0) {
            this.props.actions.initialConfigLoad(this.props.configurationSettings.currentOrganization.id);
            this.props.actions.fetchOrganizations();
        }
        this.onUnload = this.onUnload.bind(this);
    }

    onUnload = (e: any) => {
        if(this.props.configurationSettings.anyUnsavedChanges) {
            e.returnValue = "You have unsaved config changes. Are you sure you want to exit?";
        }
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload)
    }

    componentWillUnmount() {
        this.saveConfigChanges();
        window.removeEventListener("beforeunload", this.onUnload)
    }

    saveConfigChanges() {
        const configLevel = this.props.configurationSettings.currentlyEditing.hierarchy.length - 1;

        this.props.actions.savePropertyOptions(
            this.props.configurationSettings.currentlyEditing.options,
            configLevel,
            this.props.configurationSettings.currentlyEditing.hierarchy[configLevel].id,
            this.props.configurationSettings.currentOrganization.id
        );
    }

    render() {
        const editing = this.props.configurationSettings.currentlyEditing;

        return (
            <div>
                <h1>Configuration</h1>
                <br/>
                <br/>
                <div className="col-lg-4">
                    <div className="input-name">Organization</div>
                    <ChangeOrganizationContainer/>
                    <br/>
                    <br/>
                    <table className={'tree-grid'}>
                        <tbody>
                            <ConfigurationGroupListContainer configs={this.props.configurationSettings.allConfigs}
                                                             configLevel={ConfigLevel.MANUFACTURER}
                                                             selectedId={editing == null ? null : editing.hierarchy[editing.hierarchy.length - 1].id}/>
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-8">
                    <ConfigurationEditorContainer configs={editing} organization={this.props.configurationSettings.currentOrganization}/>
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