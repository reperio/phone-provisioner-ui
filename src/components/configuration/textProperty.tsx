import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigPropertyContainer} from "./configProperty";

class TextProperty extends React.Component {
    props: any;
    static propTypes: any;

    render() {
        return (
            <ConfigPropertyContainer propertyName={this.props.propertyName} checked={!this.props.options.inherited}>
                {this.props.displayName}
                <input type="text" disabled={this.props.options.inherited} value={this.props.options.inherited ? this.props.options.inheritedValue : this.props.options.value}/>
            </ConfigPropertyContainer>
        );
    }
}

TextProperty.propTypes = {
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

export const TextPropertyContainer = connect<any, any, any>(
    null,
    mapDispatchToProps
)(TextProperty);
