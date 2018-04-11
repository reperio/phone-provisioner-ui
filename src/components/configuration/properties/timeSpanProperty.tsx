import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigPropertyContainer} from "./configProperty";
import {ConfigProperty} from "../../../store/store";
const juration = require('juration');

interface IComponentProps {
    actions?: any;
    propertyName?: string;
    children?: any;
    options?: {[property: string]: ConfigProperty; };
    min?: number;
    max?: number;
    hidden?: boolean;
}

class TimeSpanProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;
    state: any;

    constructor(props: IComponentProps) {
        super(props);
        let options = this.props.options[this.props.propertyName];
        this.state = {text: this.formatTime(options.getValue())};
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
        if(time < this.props.min || time > this.props.max) {
            time = this.props.options[this.props.propertyName].inheritedValue;
        }
        this.setState({text: this.formatTime(time)});
        this.props.actions.changePropertyValue(this.props.propertyName, time);
    }

    render() {
        const options = this.props.options[this.props.propertyName];
        let text = this.state.text;
        if(options.inherited) {
            text = this.formatTime(options.inheritedValue);
        }

        return (
            <ConfigPropertyContainer
                propertyName={this.props.propertyName}
                options={options}
                displayName={this.props.children}
                hidden={this.props.hidden}
            >
                <input
                    id={this.props.propertyName}
                    value={text}
                    onChange={this.changePropertyValue}
                    onBlur={this.savePropertyValue}
                    disabled={options.inherited}
                    className='reperio-form-input'
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

export const TimeSpanPropertyContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(TimeSpanProperty);
