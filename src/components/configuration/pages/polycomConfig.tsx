import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {BooleanPropertyContainer} from "../properties/booleanProperty";
import {TextPropertyContainer} from "../properties/textProperty";
import {ConfigProperty} from "../../../store/store";
import {PassPropsToChildren} from "../../passPropsToChildren";

interface IComponentProps {
    actions?: any;
    options?: {[property: string]: ConfigProperty; };
}

class PolycomConfig extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    render() {
        return (
            <PassPropsToChildren options={this.props.options}>
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
)(PolycomConfig);
