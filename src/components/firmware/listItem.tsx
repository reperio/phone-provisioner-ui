import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/firmwareActions';
import {Store} from "../../store/store";
import Card from '@material-ui/core/Card';

interface IComponentProps {
    actions?: any;
    name?: string;
}

class ListItem extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    removeFile = (e: any) => {
        this.props.actions.deleteFirmwareFile(this.props.name);
    }

    render() {
        return (
            <Card className='list-item'>
                {this.props.name}
                <i className="list-action fa fa-times-circle x" onClick={this.removeFile}></i>
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch: any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ListItemContainer = connect<IComponentProps, IComponentProps, IComponentProps, Store>(
    null,
    mapDispatchToProps
)(ListItem);