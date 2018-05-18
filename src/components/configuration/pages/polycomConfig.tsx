import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigProperty, Organization} from "../../../store/store";
import {PassPropsToChildren} from "../../passPropsToChildren";
import {PageComponentProps} from "./pageComponentProps";
import ConfigHeader from '../configHeader';
import {TextPropertyContainer} from "../properties/textProperty";


class PolycomConfig extends React.Component<PageComponentProps, {}> {
    props: PageComponentProps;

    render() {
        return (
            <PassPropsToChildren options={this.props.options} organization={this.props.organization}>
                <ConfigHeader base={this.props.base}/>
                <TextPropertyContainer propertyName='firmwareVersion' defaultValue=''>Firmware</TextPropertyContainer>
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
)(PolycomConfig);
