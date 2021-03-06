import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import {BaseConfigProperty, BaseComponentProps} from "./baseConfigProperty";

interface IComponentProps extends BaseComponentProps {
    possibleValues?: string[];
}

const DragHandle = SortableHandle((params: any) => <span className={params.active ? 'draggable-property' : ''}>{params.value}</span>);

const SortableItem = SortableElement((params:any) =>
    <div>
        <div className='indent' style={{width: '16px'}}></div>
        {/*Ensure that the X only appears when it's hovered over, but not when anything is being dragged*/}
        <span className={params.sorting ? 'show-x-on-hover-hidden' : 'show-x-on-hover'}>
            <DragHandle value={params.value} active={params.deleteOption}/>&nbsp;
            {params.deleteOption && <i className="fa fa-times-circle x" onClick={params.deleteOption}></i>}
        </span>
    </div>
);

const SortableList = SortableContainer((params:any) => {
    return (
        <div>
            {params.items.map((value:any, index:number) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index}
                    value={value}
                    deleteOption={params.deleteOption && params.deleteOption(index)}
                    sorting={params.sorting}
                />
            ))}
        </div>
    );
});

class SortableListProperty extends BaseConfigProperty<IComponentProps, {}> {
    state: any;

    constructor(props: IComponentProps) {
        super(props);
        this.state = {sorting: false};
    }

    onSortStart = (args:any, e:any) => {
        this.setState({sorting: true});
    }

    onSortEnd = (args:any, e:any) => {
        this.setState({sorting: false});
        const newList = arrayMove(this.props.options[this.props.propertyName].value, args.oldIndex, args.newIndex);
        this.props.actions.changePropertyValue(this.props.propertyName, newList);
    }

    shouldCancelStart = () => this.props.options[this.props.propertyName].inherited;

    addNewOption = (e: any) => {
        if(e.target.value !== null) {
            const newList = this.props.options[this.props.propertyName].value.concat([e.target.value]);
            this.props.actions.changePropertyValue(this.props.propertyName, newList);
        }
    }

    deleteOption = (index: number) => () => {
        const options = this.props.options[this.props.propertyName];
        options.value.splice(index, 1);
        this.props.actions.changePropertyValue(this.props.propertyName, options.value);
    }

    renderProperty() {
        return (
            <div>
                <div>{this.props.children}</div>
                <SortableList
                    items={this.options().getValue()}
                    onSortStart={this.onSortStart}
                    onSortEnd={this.onSortEnd}
                    shouldCancelStart={this.shouldCancelStart}
                    useDragHandle={true}
                    deleteOption={!this.options().inherited && this.deleteOption}
                    sorting={this.state.sorting}
                />
                {
                    !this.options().inherited &&
                    <select
                        onChange={this.addNewOption}
                        className='reperio-form-input'
                    >
                        <option value={null}>New Option</option>
                        {this.props.possibleValues.map(
                            (v: string, i: number) => !this.options().value.includes(v) && <option value={v} key={i}>{v}</option>
                        )}
                    </select>
                }
            </div>
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
