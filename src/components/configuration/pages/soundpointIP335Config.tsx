import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {BooleanPropertyContainer} from "../properties/booleanProperty";
import {ConfigProperty, Organization} from "../../../store/store";
import {container as SoundpointIPConfig} from "./soundpointIPConfig";
import {PassPropsToChildren} from "../../passPropsToChildren";
import ConfigHeader from '../configHeader';

interface IComponentProps {
    actions?: any;
    options?: {[property: string]: ConfigProperty; };
    organization?: Organization;
}

class SoundpointIP335Config extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    render() {
        return (
            <PassPropsToChildren options={this.props.options} organization={this.props.organization}>
                {!this.props.organization.is_global_organization && <SoundpointIPConfig/>}
                <h3>335 Model Properties</h3>
                <ConfigHeader/>
                <BooleanPropertyContainer propertyName='urlModeDialing'>URL Mode Dialing</BooleanPropertyContainer>
            </PassPropsToChildren>
        );
    }
}

function mapDispatchToProps(dispatch:any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export const container = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(SoundpointIP335Config);
