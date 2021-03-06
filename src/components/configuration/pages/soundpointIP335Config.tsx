import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {BooleanPropertyContainer} from "../properties/booleanProperty";
import {container as SoundpointIPConfig} from "./soundpointIPConfig";
import {PassPropsToChildren} from "../../passPropsToChildren";
import ConfigHeader from '../configHeader';
import {PageComponentProps} from "./pageComponentProps";
import {ProxyProps} from "../properties/proxyProps";


class SoundpointIP335Config extends React.Component<PageComponentProps, {}> {
    props: PageComponentProps;

    render() {
        return (
            <PassPropsToChildren options={this.props.options} organization={this.props.organization}>
                <SoundpointIPConfig base={false}/>
                <h3>335 Model Properties</h3>
                <ConfigHeader base={this.props.base}/>
                <BooleanPropertyContainer propertyName='urlModeDialing' defaultValue={false}>URL Mode Dialing</BooleanPropertyContainer>
                <h3>Proxy</h3>
                <ProxyProps line={1}/>
                <ProxyProps line={2}/>
            </PassPropsToChildren>
        );
    }
}

function mapDispatchToProps(dispatch:any) : PageComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export const container = connect<PageComponentProps, PageComponentProps, PageComponentProps>(
    null,
    mapDispatchToProps
)(SoundpointIP335Config);
