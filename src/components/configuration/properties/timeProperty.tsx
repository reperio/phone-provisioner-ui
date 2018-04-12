import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
const TimePicker = require('rc-time-picker').default;
import moment from 'moment';
import {BaseConfigProperty, BaseComponentProps} from "./baseConfigProperty";

class TimeProperty extends BaseConfigProperty<BaseComponentProps, {}> {
    changePropertyValue = (e: any) => {
        const options = this.props.options[this.props.propertyName];
        this.props.actions.changePropertyValue(
            this.props.propertyName, e !== null ? e.format('HH:mm') : options.inheritedValue);
    }

    renderProperty() {
        return (
            <div>
                <div className="input-name">{this.props.children}</div>
                <TimePicker
                    value={moment(this.options().getValue(), 'HH:mm')}
                    disabled={this.options().inherited}
                    showSecond={false}
                    format="HH:mm"
                    onChange={this.changePropertyValue}
                    prefixCls='reperio-form'
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch:any) : BaseComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const TimePropertyContainer = connect<BaseComponentProps, BaseComponentProps, BaseComponentProps>(
    null,
    mapDispatchToProps
)(TimeProperty);
