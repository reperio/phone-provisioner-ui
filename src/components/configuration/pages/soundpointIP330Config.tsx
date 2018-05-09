import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigProperty, Organization} from "../../../store/store";
import {container as SoundpointIPConfig} from "./soundpointIPConfig";
import {PassPropsToChildren} from "../../passPropsToChildren";
import {PageComponentProps} from "./pageComponentProps";

class SoundpointIP330Config extends React.Component<PageComponentProps, {}> {
    props: PageComponentProps;

    render() {
        return (
            <PassPropsToChildren options={this.props.options} organization={this.props.organization} isBaseOption={this.props.base}>
                <SoundpointIPConfig base={false}/>
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
