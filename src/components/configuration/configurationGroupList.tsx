import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigurationGroupContainer} from "./configurationGroup";

class ConfigurationGroupList extends React.Component {
    props: any;
    static propTypes: any;

    handleChange = (e: any) => {
        this.props.actions.test(e.target.name, e.target.value);
    }

    handleClick = (e:any) => {
        this.props.actions.test2('test', 123);
    }

    render() {
        return (
            <div>
                {this.props.configs.map((c: any) =>
                    <ConfigurationGroupContainer name={c.name} key={c.id} isExpanded={c.expanded} children={c.children}/>)}
            </div>
        );
    }
}

ConfigurationGroupList.propTypes = {
    actions: PropTypes.object,
    configs: PropTypes.arrayOf(PropTypes.object)
};

function mapDispatchToProps(dispatch:any) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigurationGroupListContainer = connect(
    null,
    mapDispatchToProps
)(ConfigurationGroupList);
