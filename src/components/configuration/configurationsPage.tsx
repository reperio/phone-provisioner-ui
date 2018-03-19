import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigurationGroupListContainer} from './configurationGroupList';
import {ConfigurationEditorContainer} from './configurationEditor';
import {ConfigLevel} from "../../constants/configLevel";

class ConfigurationsPage extends React.Component {
    props: any;
    static propTypes: any;

    constructor(props: any) {
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
                                                             configLevel={ConfigLevel.MANUFACTURER} parentId={null}
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

ConfigurationsPage.propTypes = {
    actions: PropTypes.object,
    configurationSettings: PropTypes.object
};


function mapStateToProps(state: any) {
    return {
        configurationSettings: state.configurationSettings
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigurationsPageContainer = connect<any, any, any>(
    mapStateToProps,
    mapDispatchToProps
)(ConfigurationsPage);