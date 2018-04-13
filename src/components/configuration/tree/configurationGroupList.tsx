import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigurationGroupContainer} from "./configurationGroup";
import {ConfigLevel} from '../../../constants/configLevel';

interface IComponentProps {
    actions?: any;
    configs?: any[];
    configLevel?: ConfigLevel;
    selectedId?: string;
}

class ConfigurationGroupList extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    render() {
        return this.props.configs.map((c: any) =>
            <ConfigurationGroupContainer name={c.name} key={c.id} id={c.id} isExpanded={c.expanded}
                                         children={c.children} configLevel={this.props.configLevel}
                                         selectedId={this.props.selectedId}/>);
    }
}

function mapDispatchToProps(dispatch:any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigurationGroupListContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(ConfigurationGroupList);
