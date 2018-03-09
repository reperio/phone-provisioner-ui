import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/configActions';
import {ConfigLevel} from '../../constants/configLevel';

enum ButtonState {
    Button,
    TextBox
}

class AddConfigButton extends React.Component<any, any> {
    props: any;
    static propTypes: any;

    constructor(props: any) {
        super(props);
        this.state = {buttonState: ButtonState.Button, textboxValue: ''};
    }

    addGroup = (e: any) => {
        if(e.key === 'Enter') {
            if(this.state.textboxValue != '') {
                this.props.actions.addConfigGroup(this.props.configLevel, this.state.textboxValue, this.props.parentId);
            }
            this.setToButton(e);
        } else if(e.key === 'Escape') {
            this.setToButton(e);
        }
    }

    handleChange = (e: any) => {
        this.setState({textboxValue: e.target.value});
    }

    setToTextBox = (e: any) => {
        this.setState({buttonState: ButtonState.TextBox, textboxValue: ''});
    }

    setToButton = (e: any) => {
        this.setState({buttonState: ButtonState.Button});
    }

    render() {
        switch(this.state.buttonState) {
            case ButtonState.Button:
                return (
                    <p onClick={this.setToTextBox}>+ New {this.props.name}</p>
                );
            case ButtonState.TextBox:
                return (
                    <input autoFocus type="text" onKeyUp={this.addGroup} onChange={this.handleChange.bind(this)} onBlur={this.setToButton}/>
                );
        }
    }
}

AddConfigButton.propTypes = {
    actions: PropTypes.object,
    parentId: PropTypes.string,
    configLevel: PropTypes.number,
    name: PropTypes.string
};

function mapDispatchToProps(dispatch:any) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const AddConfigButtonContainer = connect<any, any, any>(
    null,
    mapDispatchToProps
)(AddConfigButton);
