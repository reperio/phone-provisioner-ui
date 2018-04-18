import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {Store, Organization} from "../../store/store";

interface IComponentProps {
    actions?: any;
    currentOrganization?: Organization;
    organizations?: Organization[];
}

class ChangeOrganization extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    selectOption = (e: any) => {
        this.props.actions.changeOrganization(e.target.value);
    }

    render() {
        return (
            <select
                onChange={this.selectOption}
                value={this.props.currentOrganization.id}
                className='reperio-form-input'
            >
                {this.props.organizations.map(
                    (v: Organization, i: number) => <option value={v.id} key={i}>{v.name}</option>
                )}
            </select>
        );
    }
}


function mapStateToProps(state: Store) : IComponentProps {
    return {
        currentOrganization: state.configurationSettings.currentOrganization,
        organizations: state.configurationSettings.organizations
    };
}

function mapDispatchToProps(dispatch: any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ChangeOrganizationContainer = connect<IComponentProps, IComponentProps, IComponentProps, Store>(
    mapStateToProps,
    mapDispatchToProps
)(ChangeOrganization);