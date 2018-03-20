import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigPropertyContainer} from "./configProperty";
import {ConfigProperty} from "../../store/store";

interface IComponentProps {
    actions?: any;
    propertyName?: string;
    displayName?: string;
    options?: ConfigProperty;
}

class TextProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    changePropertyValue = (e: any) => {
        this.props.actions.changePropertyValue(this.props.propertyName, e.target.value);
    }

    render() {
        return (
            <ConfigPropertyContainer propertyName={this.props.propertyName} checked={!this.props.options.inherited}>
                {this.props.displayName}
                <input
                    type="text"
                    disabled={this.props.options.inherited}
                    value={this.props.options.inherited ? this.props.options.inheritedValue : this.props.options.value}
                    onChange={this.changePropertyValue}
                />
            </ConfigPropertyContainer>
        );
    }
}

function mapDispatchToProps(dispatch:any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const TextPropertyContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(TextProperty);
