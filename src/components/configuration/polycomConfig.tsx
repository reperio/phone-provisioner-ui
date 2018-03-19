import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {BooleanPropertyContainer} from "./booleanProperty";
import {TextPropertyContainer} from "./textProperty";

class PolycomConfig extends React.Component {
    props: any;
    static propTypes: any;

    render() {
        return (
            <div>
                <BooleanPropertyContainer displayName={'Test'} propertyName={'test'} options={this.props.options.test}/>
                <TextPropertyContainer displayName={'Test'} propertyName={'test2'} options={this.props.options.test2}/>
            </div>
        );
    }
}

PolycomConfig.propTypes = {
    actions: PropTypes.object,
    options: PropTypes.object
};

function mapDispatchToProps(dispatch:any) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export const container = connect<any, any, any>(
    null,
    mapDispatchToProps
)(PolycomConfig);
