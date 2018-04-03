import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigProperty as StoreConfigProp} from '../../../store/store';
import {ConfigLevelName} from "../../../constants/configLevel";
import Switch from 'material-ui/Switch';

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
            <div className={'row'} style={{height: '100px'}}>
                <div className={'col-sm-2'}>
                    <Switch onChange={this.togglePropertyInheritance} checked={!this.props.options.inherited}/>
                </div>
                <div className={'col-sm-6'}>
                    {this.props.children}
                </div>
                <div className={'col-sm-4'}>
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
