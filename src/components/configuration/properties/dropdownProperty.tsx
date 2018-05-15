import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {BaseConfigProperty, BaseComponentProps} from "./baseConfigProperty";

interface IComponentProps extends BaseComponentProps {
    possibleValues?: string[];
}

class DropdownProperty extends BaseConfigProperty<IComponentProps, {}> {
    selectOption = (e: any) => {
        this.props.actions.changePropertyValue(this.props.propertyName, e.target.value);
    }

    renderProperty() {
        return (
            <div>
                <div className="input-name">{this.props.children}</div>
                <select
                    onChange={this.selectOption}
                    disabled={this.options().inherited}
                    value={this.options().getValue()}
                    className='reperio-form-input'
                >
                    {this.props.possibleValues.map(
                        (v: string, i: number) => <option value={v} key={i}>{v}</option>
                    )}
                </select>
            </div>
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
