import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {BooleanPropertyContainer} from "../properties/booleanProperty";
import {container as SoundpointIPConfig} from "./soundpointIPConfig";
import {PassPropsToChildren} from "../../passPropsToChildren";
import ConfigHeader from '../configHeader';
import {PageComponentProps} from "./pageComponentProps";


class SoundpointIP331Config extends React.Component<PageComponentProps, {}> {
    props: PageComponentProps;

    render() {
        return (
            <PassPropsToChildren options={this.props.options} organization={this.props.organization} isBaseOption={this.props.base}>
                <SoundpointIPConfig base={false}/>
                <h3>331 Model Properties</h3>
                <ConfigHeader/>
                <BooleanPropertyContainer propertyName='urlModeDialing' defaultValue={false}>URL Mode Dialing</BooleanPropertyContainer>
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
)(SoundpointIP331Config);
