import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {BooleanPropertyContainer} from "../properties/booleanProperty";
import {TextPropertyContainer} from "../properties/textProperty";
import {ConfigProperty} from "../../../store/store";
import {container as SoundpointIPConfig} from "./soundpointIPConfig";

interface IComponentProps {
    actions?: any;
    options?: {[property: string]: ConfigProperty; };
}

class SoundpointIP335Config extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    render() {
        return (
            <div>
                <SoundpointIPConfig options={this.props.options}/>
                <BooleanPropertyContainer propertyName={'extra2'} options={this.props.options.extra2}>Extra 2</BooleanPropertyContainer>
            </div>
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