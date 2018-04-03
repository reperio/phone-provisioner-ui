import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {ConfigPropertyContainer} from "./configProperty";
import {ConfigProperty} from "../../../store/store";
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

class DropdownProperty extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    selectOption = (e: any) => {
        this.props.actions.changePropertyValue(this.props.propertyName, e.target.value);
    }

    render() {
        const options = this.props.options[this.props.propertyName];

        return (
            <ConfigPropertyContainer propertyName={this.props.propertyName} options={options}>
                <FormControl>
                    <InputLabel htmlFor={this.props.propertyName}>{this.props.children}</InputLabel>
                    <Select
                        onChange={this.selectOption}
                        disabled={options.inherited}
                        value={options.inherited ? options.inheritedValue : options.value}
                        inputProps={{
                            name: this.props.propertyName,
                            id: this.props.propertyName,
                        }}
                        className='form-input'
                    >
                        {this.props.possibleValues.map(
                            (v: string, i: number) => <MenuItem value={v} key={i}>{v}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </ConfigPropertyContainer>
        );
    }
}

function mapDispatchToProps(dispatch: any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const DropdownPropertyContainer = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(DropdownProperty);
