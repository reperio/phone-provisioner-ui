import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigPropertyContainer} from "./configProperty";
import {ConfigProperty} from "../../../store/store";

interface IComponentProps {
    actions?: any;
    propertyName?: string;
    children?: any;
    options?: {[property: string]: ConfigProperty; };
}

class BooleanProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    changePropertyValue = (e: any) => {
        this.props.actions.changePropertyValue(this.props.propertyName, e.target.checked);
    }

    render() {
        const options = this.props.options[this.props.propertyName];

        return (
            <ConfigPropertyContainer propertyName={this.props.propertyName} options={options}>
                <input
                    type="checkbox"
                    disabled={options.inherited}
                    checked={options.inherited ? options.inheritedValue : options.value}
                    onChange={this.changePropertyValue}
                />
                {this.props.children}
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
