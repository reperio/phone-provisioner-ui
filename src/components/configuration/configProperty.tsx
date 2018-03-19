import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';

class ConfigProperty extends React.Component {
    props: any;
    static propTypes: any;

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

ConfigProperty.propTypes = {
    actions: PropTypes.object,
    children: PropTypes.any,
    propertyName: PropTypes.string,
    checked: PropTypes.bool
};

function mapDispatchToProps(dispatch:any) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigPropertyContainer = connect<any, any, any>(
    null,
    mapDispatchToProps
)(ConfigProperty);
