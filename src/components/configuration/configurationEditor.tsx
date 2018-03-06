import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/testActions';

class ConfigurationEditor extends React.Component {
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
                <h2>Edit config</h2>
            </div>
        );
    }
}

ConfigurationEditor.propTypes = {
    actions: PropTypes.object,
    test: PropTypes.object
};


function mapStateToProps(state:any) {
    return {
        test: state.test
    };
}

function mapDispatchToProps(dispatch:any) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConfigurationEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigurationEditor);
