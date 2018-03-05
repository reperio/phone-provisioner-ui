import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/testActions';

export class ConfigurationGroupContainer extends React.Component {
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
                <h1>Global Configuration</h1>
                <br/>
                <br/>
                <div className="col-md-4"><p>hey</p></div>
                <div className="col-md-8"><p>woo</p></div>
            </div>
        );
    }
}

ConfigurationGroupContainer.propTypes = {
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigurationGroupContainer);
