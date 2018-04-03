import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigPropertyContainer} from "./configProperty";
import {ConfigProperty} from "../../../store/store";
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

interface IComponentProps {
    actions?: any;
    propertyName?: string;
    children?: any;
    options?: {[property: string]: ConfigProperty; };
    possibleValues?: string[];
}

const DragHandle = SortableHandle((params: any) => <span>{params.value}</span>);

const SortableItem = SortableElement((params:any) =>
    <div>
        <div className='indent' style={{width: '16px'}}></div>
        <DragHandle value={params.value}/>&nbsp;
        {params.deleteOption && <i className="fa fa-times-circle" onClick={params.deleteOption}></i>}
    </div>
);

const SortableList = SortableContainer((params:any) => {
    return (
        <div>
            {params.items.map((value:any, index:number) => (
                <SortableItem key={`item-${index}`} index={index} value={value} deleteOption={params.deleteOption && params.deleteOption(index)} />
            ))}
        </div>
    );
});

class SortableListProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    onSortEnd = (args:any, e:any) => {
        const newList = arrayMove(this.props.options[this.props.propertyName].value, args.oldIndex, args.newIndex);
        this.props.actions.changePropertyValue(this.props.propertyName, newList);
    }

    shouldCancelStart = () => this.props.options[this.props.propertyName].inherited;

    addNewOption = (e: any) => {
        if(e.target.value !== '') {
            const newList = this.props.options[this.props.propertyName].value.concat([e.target.value]);
            this.props.actions.changePropertyValue(this.props.propertyName, newList);
        }
    }

    deleteOption = (index: number) => () => {
        const options = this.props.options[this.props.propertyName];
        options.value.splice(index, 1);
        this.props.actions.changePropertyValue(this.props.propertyName, options.value);
    }

    render() {
        const options = this.props.options[this.props.propertyName];

        return (
            <ConfigPropertyContainer propertyName={this.props.propertyName} options={options}>
                <div>{this.props.children}</div>
                <SortableList
                    items={options.inherited ? options.inheritedValue : options.value}
                    onSortEnd={this.onSortEnd}
                    shouldCancelStart={this.shouldCancelStart}
                    useDragHandle={true}
                    deleteOption={!options.inherited && this.deleteOption}
                />
                {
                    !options.inherited &&
                    <FormControl>
                        <InputLabel htmlFor={this.props.propertyName}>New option</InputLabel>
                        <Select
                            onChange={this.addNewOption}
                            value=''
                            name='New option'
                            inputProps={{
                                name: this.props.propertyName,
                                id: this.props.propertyName,
                            }}
                            className='form-input'
                        >
                            {this.props.possibleValues.map(
                                (v: string, i: number) => !options.value.includes(v) && <MenuItem value={v} key={i}>{v}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                }
            </ConfigPropertyContainer>
        );
    }
}

function mapDispatchToProps(dispatch:any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const SortableListPropertyContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(SortableListProperty);
