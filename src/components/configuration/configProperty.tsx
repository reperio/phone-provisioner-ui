import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigProperty as StoreConfigProp} from '../../store/store';
import {ConfigLevelName} from "../../constants/configLevel";

interface IComponentProps {
    actions?: any;
    children?: any;
    propertyName?: string;
    options?: StoreConfigProp;
}

class ConfigProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    togglePropertyInheritance = (e: any) => {
        this.props.actions.togglePropertyInheritance(this.props.propertyName, !e.target.checked);
    }

    render() {
        return (
            <div className={'row'}>
                <div className={'col-md-1'}>
                    <input type="checkbox" onChange={this.togglePropertyInheritance} checked={!this.props.options.inherited}/>
                </div>
                <div className={'col-md-7'}>
                    {this.props.children}
                </div>
                <div className={'col-md-4'}>
                    {this.props.options.inherited && `Inherited from ${ConfigLevelName(this.props.options.inheritLevel)}`}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch:any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigPropertyContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(ConfigProperty);
