import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {Store, CurrentlyEditing} from "../../store/store";

interface IComponentProps {
    actions?: any;
    anyChanges?: boolean;
    currentlyEditing?: CurrentlyEditing;
}

class SaveConfigButton extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    saveChanges = (e: any) => {
        const configLevel = this.props.currentlyEditing.hierarchy.length - 1;

        this.props.actions.savePropertyOptions(
            this.props.currentlyEditing.options, configLevel, this.props.currentlyEditing.hierarchy[configLevel].id
        );
    }

    render() {
        return (
            <div>
                <button type="button" disabled={!this.props.anyChanges} onClick={this.saveChanges}>
                    Save
                </button>
            </div>
        );
    }
}

function mapStateToProps(state: Store) : IComponentProps {
    return {
        anyChanges: state.configurationSettings.anyUnsavedChanges,
        currentlyEditing: state.configurationSettings.currentlyEditing
    };
}

function mapDispatchToProps(dispatch:any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const SaveConfigButtonContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    mapStateToProps,
    mapDispatchToProps
)(SaveConfigButton);
