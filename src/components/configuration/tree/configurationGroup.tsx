import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigurationGroupListContainer} from "./configurationGroupList";
import {ConfigLevel} from "../../../constants/configLevel";
import {ConfigProperty, CurrentlyEditing, Store} from "../../../store/store";

const ManufacturerIcon = require('../../../assets/manufacturer.png');
const FamilyIcon = require('../../../assets/family.png');
const ModelIcon = require('../../../assets/model.png');

const icons = [
  ManufacturerIcon,
  FamilyIcon,
  ModelIcon
];

interface IComponentProps {
    actions?: any;
    name?: string;
    isExpanded?: boolean;
    children?: any[];
    configLevel?: ConfigLevel;
    id?: string;
    selectedId?: string;
    anyChanges?: boolean;
    currentlyEditing?: CurrentlyEditing;
    organization?: string;
}

class ConfigurationGroup extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    expandGroup = (e: any) => {
        if(this.props.children == null) {
            //Expands the group while also lazy loading the items within
            this.props.actions.expandConfigGroupInitialLoad(this.props.configLevel, this.props.id, this.props.organization);
        } else {
            this.props.actions.expandConfigGroup(this.props.id);
        }
    }

    selectConfig = (e: any) => {
        if(this.props.currentlyEditing != null) {
            const configLevel = this.props.currentlyEditing.hierarchy.length - 1;
            this.props.actions.selectConfig(
                this.props.id,
                this.props.anyChanges,
                this.props.currentlyEditing.options,
                configLevel,
                this.props.currentlyEditing.hierarchy[configLevel].id,
                this.props.organization
            );
        } else {
            this.props.actions.selectConfig(this.props.id, false, null, 0, null, this.props.organization);
        }
    }

    render():any {
        const children = (
            <ConfigurationGroupListContainer configs={this.props.children} configLevel={this.props.configLevel + 1} selectedId={this.props.selectedId}/>
        );

        const expandIcon = (
            <span onClick={this.expandGroup} className={'tree-item'}>
                <i className={this.props.isExpanded ? 'fa fa-chevron-down' : 'fa fa-chevron-right'}></i>
            </span>
        );

        const indentAmount = this.props.configLevel * 22 + 4;
        return (
            <>
                <tr>
                    <td className={'expand'}>
                        {this.props.configLevel !== ConfigLevel.MODEL && expandIcon}
                    </td>
                    <td>
                        <span className={'indent'} style={{width: indentAmount + 'px'}}></span>
                        <span onClick={this.selectConfig} className={'tree-item'}>
                            <span className={"icon"} style={{backgroundImage: `url(${icons[this.props.configLevel]})`}}></span>
                            {this.props.id === this.props.selectedId ? <b>{this.props.name}</b> : this.props.name}
                        </span>
                    </td>
                </tr>
                {this.props.isExpanded && children}
            </>
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

export const ConfigurationGroupContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    mapStateToProps,
    mapDispatchToProps
)(ConfigurationGroup);
