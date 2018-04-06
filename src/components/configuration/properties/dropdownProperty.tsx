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
    possibleValues?: string[];
}

class DropdownProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    selectOption = (e: any) => {
        this.props.actions.changePropertyValue(this.props.propertyName, e.target.value);
    }

    render() {
        const options = this.props.options[this.props.propertyName];

        return (
            <ConfigPropertyContainer propertyName={this.props.propertyName} options={options} displayName={this.props.children}>
                <select
                    onChange={this.selectOption}
                    disabled={options.inherited}
                    value={options.inherited ? options.inheritedValue : options.value}
                    className='reperio-form-input'
                >
                    {this.props.possibleValues.map(
                        (v: string, i: number) => <option value={v} key={i}>{v}</option>
                    )}
                </select>
            </ConfigPropertyContainer>
        );
    }
}

function mapDispatchToProps(dispatch: any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const DropdownPropertyContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(DropdownProperty);
