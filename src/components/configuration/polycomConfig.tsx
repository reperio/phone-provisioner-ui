import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {BooleanPropertyContainer} from "./booleanProperty";
import {TextPropertyContainer} from "./textProperty";
import {ConfigProperty} from "../../store/store";

interface IComponentProps {
    actions?: any;
    options?: {[property: string]: ConfigProperty; };
}

class PolycomConfig extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    render() {
        return (
            <div>
                <BooleanPropertyContainer displayName={'Test'} propertyName={'test'} options={this.props.options.test}/>
                <TextPropertyContainer displayName={'Test'} propertyName={'test2'} options={this.props.options.test2}/>
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
)(PolycomConfig);
