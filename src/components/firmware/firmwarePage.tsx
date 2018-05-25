import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/firmwareActions';
import {Store, FirmwareSettings} from "../../store/store";
import {ListItemContainer} from "./listItem";
import Button from 'material-ui/Button';

interface IComponentProps {
    actions?: any;
    firmwareSettings?: FirmwareSettings;
}

class FirmwarePage extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    constructor(props: IComponentProps) {
        super(props);
        if(this.props.firmwareSettings.files.length === 0) {
            this.props.actions.getFirmwareFiles();
        }
    }

    addFile = (e: any) => {

    }

    render() {
        return (
            <div>
                <h1>Firmware Files</h1>
                <br/>
                <br/>
                {this.props.firmwareSettings.files.map((file: string) => <ListItemContainer name={file} key={file}/>)}
                <Button
                    variant="raised"
                    color="primary"
                    onClick={this.addFile}
                    className="save-button"
                >
                    New File
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