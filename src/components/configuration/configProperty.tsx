import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';

interface IComponentProps {
    actions?: any;
    children?: any;
    propertyName?: string;
    checked?: boolean;
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
                    <input type="checkbox" onChange={this.togglePropertyInheritance} checked={this.props.checked}/>
                </div>
                <div className={'col-md-7'}>
                    {this.props.children}
                </div>
                <div className={'col-md-4'}>
                    Inherited from manufacturer
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
