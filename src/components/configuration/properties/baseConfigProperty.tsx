import React from 'react';
import {ConfigPropertyRowContainer} from "./configPropertyRow";
import {ConfigProperty, Organization} from "../../../store/store";
import {ConfigLevel} from "../../../constants/configLevel";

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

    render() {
        if(this.props.hidden && (this.options().inherited || this.props.isBaseOption)) {
            return <div></div>;
        }
        return (
            <ConfigPropertyRowContainer propertyName={this.props.propertyName} options={this.options()} isBaseOption={this.props.isBaseOption}>
                {this.renderProperty()}
            </ConfigPropertyRowContainer>
        );
    }

    abstract renderProperty() : React.ReactNode;
}