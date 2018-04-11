import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigPropertyRowContainer} from "./configPropertyRow";
import {ConfigProperty} from "../../../store/store";
import Checkbox from 'material-ui/Checkbox';

interface IComponentProps {
    actions?: any;
    propertyName?: string;
    children?: any;
    options?: {[property: string]: ConfigProperty; };
    hidden?: boolean;
}

class BooleanProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    changePropertyValue = (e: any) => {
        this.props.actions.changePropertyValue(this.props.propertyName, e.target.checked);
    }

    render() {
        const options = this.props.options[this.props.propertyName];

        return (
            <ConfigPropertyRowContainer propertyName={this.props.propertyName} options={options} hidden={this.props.hidden}>
                <Checkbox
                    disabled={options.inherited}
                    checked={options.getValue()}
                    onChange={this.changePropertyValue}
                    classes={{checked: 'selected-toggle', disabled: 'disabled-toggle'}}
                />
                {this.props.children}
            </ConfigPropertyRowContainer>
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
