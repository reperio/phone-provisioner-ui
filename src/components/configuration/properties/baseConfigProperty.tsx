import React from 'react';
import {ConfigProperty, Organization} from "../../../store/store";
import {ConfigLevel, ConfigLevelName} from "../../../constants/configLevel";
import Switch from 'material-ui/Switch';

export interface BaseComponentProps {
    actions?: any;
    propertyName?: string;
    children?: any;
    options?: {[property: string]: ConfigProperty; };
    organization?: Organization;//Remove?
    hidden?: boolean;
    isBaseOption?: boolean;
    defaultValue?: any;
}

export abstract class BaseConfigProperty<P extends BaseComponentProps, S> extends React.Component<P, S> {
    props: P;

    options = () => {
        if(this.props.options[this.props.propertyName] === undefined) {
            this.props.options[this.props.propertyName] = new ConfigProperty(true, ConfigLevel.DISABLED, this.props.defaultValue, this.props.defaultValue);
        }
        return this.props.options[this.props.propertyName];
    };

    togglePropertyInheritance = (e: any) => {
        this.props.actions.togglePropertyInheritance(this.props.propertyName, !e.target.checked);
    }

    render() {
        if(this.props.hidden && (this.options().inherited || this.props.isBaseOption)) {
            return <div></div>;
        }
        return (
            <div className='row'>
                <div className={'col-sm-2 centered-column'}>
                    <Switch
                        onChange={this.togglePropertyInheritance}
                        checked={!this.options().inherited}
                        classes={{checked: 'selected-toggle', bar: !this.options().inherited ? 'selected-toggle-bar' : null}}
                    />
                </div>
                <div className={'col-sm-6 centered-column'}>
                    {
                        this.options().inheritLevel === ConfigLevel.DISABLED && this.options().inherited
                            ? this.props.children : this.renderProperty()
                    }
                </div>
                <div className={'col-sm-4 centered-column'}>
                    {this.options().inherited && ConfigLevelName(this.options().inheritLevel)}
                </div>
            </div>
        );
    }

    abstract renderProperty() : React.ReactNode;
}