import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {Store, CurrentlyEditing} from "../../store/store";
import Button from '@material-ui/core/Button';

interface IComponentProps {
    actions?: any;
    anyChanges?: boolean;
    currentlyEditing?: CurrentlyEditing;
    organization?: string;
}

class SaveConfigButton extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    saveChanges = (e: any) => {
        const configLevel = this.props.currentlyEditing.hierarchy.length - 1;

        this.props.actions.savePropertyOptions(
            this.props.currentlyEditing.options,
            configLevel,
            this.props.currentlyEditing.hierarchy[configLevel].id,
            this.props.organization
        );
    }

    render() {
        return (
            <div>
                <div className="vertical-spacer"></div>
                <Button
                    variant="raised"
                    color="primary"
                    disabled={!this.props.anyChanges}
                    onClick={this.saveChanges}
                    className="save-button"
                >
                    Save
                </Button>
                <div className="vertical-spacer"></div>
            </div>
        );
    }
}

function mapStateToProps(state: Store) : IComponentProps {
    return {
        anyChanges: state.configurationSettings.anyUnsavedChanges,
        currentlyEditing: state.configurationSettings.currentlyEditing,
        organization: state.configurationSettings.currentOrganization.id
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
