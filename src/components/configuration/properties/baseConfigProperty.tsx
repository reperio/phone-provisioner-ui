import React from 'react';
import {ConfigPropertyRowContainer} from "./configPropertyRow";
import {ConfigProperty, Organization} from "../../../store/store";

export interface BaseComponentProps {
    actions?: any;
    propertyName?: string;
    children?: any;
    options?: {[property: string]: ConfigProperty; };
    organization?: Organization;
    hidden?: boolean;
}

export abstract class BaseConfigProperty<P extends BaseComponentProps, S> extends React.Component<P, S> {
    props: P;

    options = () => this.props.options[this.props.propertyName];

    render() {
        if(this.props.organization.is_global_organization) {
            return this.renderProperty();
        } else {
            return (
                <ConfigPropertyRowContainer propertyName={this.props.propertyName} options={this.options()} hidden={this.props.hidden}>
                    {this.renderProperty()}
                </ConfigPropertyRowContainer>
            );
        }
    }

    abstract renderProperty() : React.ReactNode;
}