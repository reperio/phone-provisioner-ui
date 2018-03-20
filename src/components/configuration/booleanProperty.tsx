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

class BooleanProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    changePropertyValue = (e: any) => {
        this.props.actions.changePropertyValue(this.props.propertyName, e.target.checked);
    }

    render() {
        return (
            <ConfigPropertyContainer propertyName={this.props.propertyName} checked={!this.props.options.inherited}>
                <input
                    type="checkbox"
                    disabled={this.props.options.inherited}
                    checked={this.props.options.inherited ? this.props.options.inheritedValue : this.props.options.value}
                    onChange={this.changePropertyValue}
                />
                {this.props.displayName}
            </ConfigPropertyContainer>
        );
    }
}

function mapDispatchToProps(dispatch: any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const BooleanPropertyContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(BooleanProperty);
