import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {BaseConfigProperty, BaseComponentProps} from "./baseConfigProperty";

interface IComponentProps extends BaseComponentProps {
    isInteger?: boolean;
    min?: number;
    max?: number;
}

class TextProperty extends BaseConfigProperty<IComponentProps, {}> {
    isValidInt(val: string) : boolean {
        //Only allow 0-9 with a sign at the beginning if the input allows negatives
        const exp = this.props.min >= 0 ? /^[\d]*$/ : /^-?[\d]*$/;
        return exp.test(val);
    }

    changePropertyValue = (e: any) => {
        if(this.props.isInteger && !this.isValidInt(e.target.value)) {
            return;
        }
        this.props.actions.changePropertyValue(this.props.propertyName, e.target.value);
    }

    isInRange(val: string) : boolean {
        if (val === '' || val === '-') {
            return false;
        }
        const valAsNum = parseInt(val);
        return (this.props.min === undefined || valAsNum >= this.props.min) && (this.props.max === undefined || valAsNum <= this.props.max);
    }


    validatePropertyRange = (e: any) => {
        if(this.props.isInteger && !this.isInRange(e.target.value)) {
            const defaultValue = this.props.options[this.props.propertyName].inheritedValue;
            this.props.actions.changePropertyValue(this.props.propertyName, defaultValue);
        }
    }

    renderProperty() {
        return (
            <div>
                <div className="input-name">{this.props.children}</div>
                <input
                    id={this.props.propertyName}
                    value={this.options().getValue()}
                    onChange={this.changePropertyValue}
                    onBlur={this.validatePropertyRange}
                    disabled={this.options().inherited}
                    className='reperio-form-input'
                />
            </div>
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
