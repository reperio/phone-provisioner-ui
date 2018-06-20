import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/firmwareActions';
import {Store, FirmwareSettings} from "../../store/store";
import {ListItemContainer} from "./listItem";
import Button from '@material-ui/core/Button';

interface IComponentProps {
    actions?: any;
    firmwareSettings?: FirmwareSettings;
}

class FirmwarePage extends React.Component<IComponentProps, {}> {
    props: IComponentProps;
    inputElement: HTMLInputElement;

    constructor(props: IComponentProps) {
        super(props);
        if(this.props.firmwareSettings.files.length === 0) {
            this.props.actions.getFirmwareFiles();
        }
    }

    addFile = (e: any) => {
        this.props.actions.addFirmwareFiles(e.target.files);
    }

    clickButton = (e: any) => {
        this.inputElement.click();
    }

    render() {
        return (
            <div>
                <h1>Firmware Files</h1>
                <br/>
                <br/>
                {this.props.firmwareSettings.files.map((file: string) => <ListItemContainer name={file} key={file}/>)}
                <input
                    type='file'
                    multiple
                    accept='.ld'
                    style={{display: 'none'}}
                    ref={me => this.inputElement = me}
                    onChange={this.addFile}
                />
                <Button
                    variant="raised"
                    color="primary"
                    onClick={this.clickButton}
                    className="save-button"
                >
                    Add File(s)
                </Button>
            </div>
        );
    }
}


function mapStateToProps(state: Store) : IComponentProps {
    return {
        firmwareSettings: state.firmwareSettings
    };
}

function mapDispatchToProps(dispatch: any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const FirmwarePageContainer = connect<IComponentProps, IComponentProps, IComponentProps, Store>(
    mapStateToProps,
    mapDispatchToProps
)(FirmwarePage);