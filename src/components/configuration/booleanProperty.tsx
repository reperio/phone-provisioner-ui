import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigPropertyContainer} from "./configProperty";

class BooleanProperty extends React.Component {
    props: any;
    static propTypes: any;

    changePropertyValue = (e: any) => {
        this.props.actions.changePropertyValue(this.props.propertyName, e.target.checked);
    }

    render() {
        return (
            <ConfigPropertyContainer propertyName={this.props.propertyName} checked={!this.props.options.inherited}>
                <input
                    type="checkbox"
                    disabled={this.props.options.inherited}
                    checked={this.props.options.inherited ? this.props.options.inheritedValue : this.props.options.value}
                    onChange={this.changePropertyValue}
                />
                {this.props.displayName}
            </ConfigPropertyContainer>
        );
    }
}

BooleanProperty.propTypes = {
    actions: PropTypes.object,
    propertyName: PropTypes.string,
    displayName: PropTypes.string,
    options: PropTypes.object
};

function mapDispatchToProps(dispatch:any) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const BooleanPropertyContainer = connect<any, any, any>(
    null,
    mapDispatchToProps
)(BooleanProperty);
