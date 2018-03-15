import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigurationGroupContainer} from "./configurationGroup";
import {ConfigLevel} from '../../constants/configLevel';

class ConfigurationGroupList extends React.Component {
    props: any;
    static propTypes: any;

    render() {
        return (
            <div>
                {this.props.configs.map((c: any) =>
                    <ConfigurationGroupContainer name={c.name} key={c.id} id={c.id} isExpanded={c.expanded} children={c.children} configLevel={this.props.configLevel} selectedId={this.props.selectedId}/>)}
            </div>
        );
    }
}

ConfigurationGroupList.propTypes = {
    actions: PropTypes.object,
    configs: PropTypes.arrayOf(PropTypes.object),
    configLevel: PropTypes.number,
    selectedId: PropTypes.string
};

function mapDispatchToProps(dispatch:any) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigurationGroupListContainer = connect<any, any, any>(
    null,
    mapDispatchToProps
)(ConfigurationGroupList);
