import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigProperty, Organization} from "../../../store/store";
import {PassPropsToChildren} from "../../passPropsToChildren";
import {PageComponentProps} from "./pageComponentProps";


class PolycomConfig extends React.Component<PageComponentProps, {}> {
    props: PageComponentProps;

    render() {
        return (
            <PassPropsToChildren options={this.props.options} organization={this.props.organization} isBaseOption={this.props.base}>
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
