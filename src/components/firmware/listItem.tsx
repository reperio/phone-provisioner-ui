import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/firmwareActions';
import {Store} from "../../store/store";
import Card from 'material-ui/Card';

interface IComponentProps {
    actions?: any;
    name?: string;
}

class ListItem extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    removeFile() {
    }

    render() {
        return (
            <Card className='list-item'>
                <span className='list-body'>
                    {this.props.name}
                </span>
                <span className='list-action'>
                    X
                </span>
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