import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import Checkbox from 'material-ui/Checkbox';
import {BaseConfigProperty, BaseComponentProps} from "./baseConfigProperty";

class BooleanProperty extends BaseConfigProperty<BaseComponentProps, {}> {
    changePropertyValue = (e: any) => {
        this.props.actions.changePropertyValue(this.props.propertyName, e.target.checked);
    }

    renderProperty() {
        return (
            <div>
                <Checkbox
                    disabled={this.options().inherited}
                    checked={this.options().getValue()}
                    onChange={this.changePropertyValue}
                    classes={{checked: 'selected-toggle', disabled: 'disabled-toggle'}}
                />
                {this.props.children}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch: any) : BaseComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const BooleanPropertyContainer = connect<BaseComponentProps, BaseComponentProps, BaseComponentProps>(
    null,
    mapDispatchToProps
)(BooleanProperty);
