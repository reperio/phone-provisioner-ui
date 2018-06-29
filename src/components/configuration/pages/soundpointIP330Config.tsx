import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {container as SoundpointIPConfig} from "./soundpointIPConfig";
import {PassPropsToChildren} from "../../passPropsToChildren";
import {PageComponentProps} from "./pageComponentProps";
import {ProxyProps} from "../properties/proxyProps";

class SoundpointIP330Config extends React.Component<PageComponentProps, {}> {
    props: PageComponentProps;

    render() {
        return (
            <PassPropsToChildren options={this.props.options} organization={this.props.organization}>
                <SoundpointIPConfig base={false}/>
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
)(SoundpointIP330Config);
