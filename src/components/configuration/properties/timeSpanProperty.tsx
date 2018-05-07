import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
const juration = require('juration');
import {BaseConfigProperty, BaseComponentProps} from "./baseConfigProperty";

interface IComponentProps extends BaseComponentProps {
    min?: number;
    max?: number;
}

class TimeSpanProperty extends BaseConfigProperty<IComponentProps, {}> {
    state: any;

    constructor(props: IComponentProps) {
        super(props);
        this.state = {text: this.formatTime(this.options().getValue())};
    }

    formatTime(time: number) : string {
        let prefix = '';
        if(time < 0) {
            time = -time;
            prefix = '-';
        }
        return `${prefix}${juration.stringify(time, {format: 'micro'})}`;
    }

    unformatTime(time: string) : number {
        try {
            if(time.startsWith('-')) {
                return Math.round(-juration.parse(time.substr(1)));
            } else {
                return Math.round(juration.parse(time));
            }
        } catch {
            return Math.round(this.props.options[this.props.propertyName].inheritedValue);
        }
    }

    changePropertyValue = (e: any) => {
        this.setState({text: e.target.value});
    }

    savePropertyValue = (e: any) => {
        let time = this.unformatTime(e.target.value);
        if((this.props.min !== undefined && time < this.props.min) || (this.props.max !== undefined && time > this.props.max)) {
            time = this.props.options[this.props.propertyName].inheritedValue;
        }
        const newTime = this.formatTime(time);
        if(this.state.text != newTime) {
            this.setState({text: newTime});
            this.props.actions.changePropertyValue(this.props.propertyName, time);
        }
    }

    renderProperty() {
        let text = this.state.text;
        if(this.options().inherited) {
            text = this.formatTime(this.options().inheritedValue);
        }

        return (
            <div>
                <div className="input-name">{this.props.children}</div>
                <input
                    id={this.props.propertyName}
                    value={text}
                    onChange={this.changePropertyValue}
                    onBlur={this.savePropertyValue}
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

export const TimeSpanPropertyContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(TimeSpanProperty);
