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

    private getName() : string {
        switch(this.props.configLevel) {
            case ConfigLevel.MANUFACTURER:
                return 'manufacturer';
            case ConfigLevel.FAMILY:
                return 'family';
            case ConfigLevel.MODEL:
                return 'model';
            default:
                return '';
        }
    }

    addGroup = (e: any) => {
        const name = prompt(`Please enter a name for the ${this.getName()}.`);
        if(name != null) {
            this.props.actions.addConfigGroup(this.props.configLevel, name, this.props.parent);
        }
    }

    render() {
        return (
            <div>
                {this.props.configs.map((c: any) =>
                    <ConfigurationGroupContainer name={c.name} key={c.id} id={c.id} isExpanded={c.expanded} children={c.children} configLevel={this.props.configLevel}/>)}
                <p onClick={this.addGroup}>+ New {this.getName()}</p>
            </div>
        );
    }
}

ConfigurationGroupList.propTypes = {
    actions: PropTypes.object,
    configs: PropTypes.arrayOf(PropTypes.object),
    configLevel: PropTypes.number,
    parent: PropTypes.string
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
