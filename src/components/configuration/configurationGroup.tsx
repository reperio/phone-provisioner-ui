import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigurationGroupListContainer} from "./configurationGroupList";

class ConfigurationGroup extends React.Component {
    props: any;
    static propTypes: any;

    expandGroup = (e:any) => {
        this.props.actions.test2('test', 123);
    }

    render() {
        return (
            <div>
                <p onClick={this.expandGroup}>{this.props.name}</p>
                {this.props.isExpanded && <ConfigurationGroupListContainer configs={this.props.children}/>}
            </div>
        );
    }
}

ConfigurationGroup.propTypes = {
    actions: PropTypes.object,
    name: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.object)
};

function mapDispatchToProps(dispatch:any) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigurationGroupContainer = connect(
    null,
    mapDispatchToProps
)(ConfigurationGroup);
