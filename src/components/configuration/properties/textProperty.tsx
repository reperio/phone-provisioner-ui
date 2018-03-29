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

class TextProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    changePropertyValue = (e: any) => {
        this.props.actions.changePropertyValue(this.props.propertyName, e.target.value);
    }

    render() {
        const options = this.props.options[this.props.propertyName];

        return (
            <ConfigPropertyContainer propertyName={this.props.propertyName} options={options}>
                {this.props.children}
                <input
                    type="text"
                    disabled={options.inherited}
                    value={options.inherited ? options.inheritedValue : options.value}
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
