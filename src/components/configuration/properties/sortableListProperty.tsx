import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigPropertyContainer} from "./configProperty";
import {ConfigProperty} from "../../../store/store";
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

interface IComponentProps {
    actions?: any;
    propertyName?: string;
    children?: any;
    options?: ConfigProperty;
    possibleValues?: string[];
}

const DragHandle = SortableHandle((params: any) => <span>{params.value}</span>);

const SortableItem = SortableElement((params:any) =>
    <li>
        <DragHandle value={params.value}/>&nbsp;
        {params.deleteOption && <i className="fa fa-times-circle" onClick={params.deleteOption}></i>}
    </li>
);

const SortableList = SortableContainer((params:any) => {
    return (
        <ul>
            {params.items.map((value:any, index:number) => (
                <SortableItem key={`item-${index}`} index={index} value={value} deleteOption={params.deleteOption && params.deleteOption(index)} />
            ))}
        </ul>
    );
});

class SortableListProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    onSortEnd = (args:any, e:any) => {
        const newList = arrayMove(this.props.options.value, args.oldIndex, args.newIndex);
        this.props.actions.changePropertyValue(this.props.propertyName, newList);
    }

    shouldCancelStart = () => this.props.options.inherited;

    addNewOption = (e: any) => {
        if(e.target.value !== null) {
            const newList = this.props.options.value.concat([e.target.value]);
            this.props.actions.changePropertyValue(this.props.propertyName, newList);
        }
    }

    deleteOption = (index: number) => () => {
        this.props.options.value.splice(index, 1);
        this.props.actions.changePropertyValue(this.props.propertyName, this.props.options.value);
    }

    render() {
        return (
            <ConfigPropertyContainer propertyName={this.props.propertyName} options={this.props.options}>
                <p>{this.props.children}</p>
                <SortableList
                    items={this.props.options.inherited ? this.props.options.inheritedValue : this.props.options.value}
                    onSortEnd={this.onSortEnd}
                    shouldCancelStart={this.shouldCancelStart}
                    useDragHandle={true}
                    deleteOption={!this.props.options.inherited && this.deleteOption}
                />
                {
                    !this.props.options.inherited &&
                    <div>
                        +
                        <select onChange={this.addNewOption}>
                            <option value={null}>New option</option>
                            {this.props.possibleValues.map(
                                (v: string, i: number) => !this.props.options.value.includes(v) && <option value={v} key={i}>{v}</option>
                            )}
                        </select>
                    </div>
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
