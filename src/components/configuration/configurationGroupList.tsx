import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigurationGroupContainer} from "./configurationGroup";
import {ConfigLevel} from '../../constants/configLevel';
import {AddConfigButtonContainer} from "./addConfigButton";

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

    render() {
        return (
            <div>
                {this.props.configs.map((c: any) =>
                    <ConfigurationGroupContainer name={c.name} key={c.id} id={c.id} isExpanded={c.expanded} children={c.children} configLevel={this.props.configLevel} selectedId={this.props.selectedId}/>)}
                <AddConfigButtonContainer parentId={this.props.parentId} configLevel={this.props.configLevel} name={this.getName()}/>
            </div>
        );
    }
}

ConfigurationGroupList.propTypes = {
    actions: PropTypes.object,
    configs: PropTypes.arrayOf(PropTypes.object),
    configLevel: PropTypes.number,
    parentId: PropTypes.string,
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
