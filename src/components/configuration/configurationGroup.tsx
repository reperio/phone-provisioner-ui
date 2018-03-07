import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigurationGroupListContainer} from "./configurationGroupList";
import {ConfigLevel} from "../../constants/configLevel";

class ConfigurationGroup extends React.Component {
    props: any;
    static propTypes: any;

    expandGroup = (e: any) => {
        if(this.props.configLevel === ConfigLevel.MODEL) {
            return;
        }

        if(this.props.children == null) {
            //Expands the group while also lazy loading the items within
            this.props.actions.expandConfigGroupInitialLoad(this.props.configLevel, this.props.id);
        } else {
            this.props.actions.expandConfigGroup(this.props.id);
        }
    }

    render() {
        const children = (
            <div className={'indented'}>
                <ConfigurationGroupListContainer configs={this.props.children} configLevel={this.props.configLevel + 1} parent={this.props.id}/>
            </div>
        );

        return (
            <div>
                <p onClick={this.expandGroup}>{this.props.name}</p>
                {this.props.isExpanded && children}
            </div>
        );
    }
}

ConfigurationGroup.propTypes = {
    actions: PropTypes.object,
    name: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.object),
    configLevel: PropTypes.number,
    id: PropTypes.string
};

function mapDispatchToProps(dispatch:any) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigurationGroupContainer = connect<any, any, any>(
    null,
    mapDispatchToProps
)(ConfigurationGroup);
