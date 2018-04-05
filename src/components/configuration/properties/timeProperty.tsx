import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigPropertyContainer} from "./configProperty";
import {ConfigProperty} from "../../../store/store";
const TimePicker = require('rc-time-picker').default;
import moment from 'moment';

interface IComponentProps {
    actions?: any;
    propertyName?: string;
    children?: any;
    options?: {[property: string]: ConfigProperty; };
}

class TimeProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    changePropertyValue = (e: any) => {
        const options = this.props.options[this.props.propertyName];
        this.props.actions.changePropertyValue(
            this.props.propertyName, e !== null ? e.format('HH:mm') : options.inheritedValue);
    }

    render() {
        const options = this.props.options[this.props.propertyName];

        return (
            <ConfigPropertyContainer propertyName={this.props.propertyName} options={options} displayName={this.props.children}>
                <TimePicker
                    value={moment(options.inherited ? options.inheritedValue : options.value, 'HH:mm')}
                    disabled={options.inherited}
                    showSecond={false}
                    format="HH:mm"
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

export const TimePropertyContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(TimeProperty);
