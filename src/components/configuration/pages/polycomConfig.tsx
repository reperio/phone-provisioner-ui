import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {BooleanPropertyContainer} from "../properties/booleanProperty";
import {TextPropertyContainer} from "../properties/textProperty";
import {ConfigProperty} from "../../../store/store";

interface IComponentProps {
    actions?: any;
    options?: {[property: string]: ConfigProperty; };
}

class PolycomConfig extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    render() {
        return (
            <div>
                <BooleanPropertyContainer propertyName={'test'} options={this.props.options.test}>Test</BooleanPropertyContainer>
                <TextPropertyContainer propertyName={'test2'} options={this.props.options.test2}>Test 2</TextPropertyContainer>
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
