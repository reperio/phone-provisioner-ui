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
    isBaseOption?: boolean;
}

class ConfigPropertyRow extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    togglePropertyInheritance = (e: any) => {
        this.props.actions.togglePropertyInheritance(this.props.propertyName, !e.target.checked);
    }

    render() {
        return (
            <div className='row'>
                <div className={'col-sm-2 centered-column'}>
                    {
                        !this.props.isBaseOption ?
                        <Switch
                            onChange={this.togglePropertyInheritance}
                            checked={!this.props.options.inherited}
                            classes={{checked: 'selected-toggle', bar: !this.props.options.inherited ? 'selected-toggle-bar' : null}}
                        /> :
                        <div style={{height:48}}></div>
                    }
                </div>
                <div className={'col-sm-6 centered-column'}>
                    {this.props.children}

                </div>
                <div className={'col-sm-4 centered-column'}>
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

export const ConfigPropertyRowContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(ConfigPropertyRow);
