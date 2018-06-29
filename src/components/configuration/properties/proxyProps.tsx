import * as React from 'react';
import {TextPropertyContainer} from "./textProperty";
import {DropdownPropertyContainer} from "./dropdownProperty";
import {TimeSpanPropertyContainer} from "./timeSpanProperty";
import {ConfigProperty} from "../../../store/store";
import {PassPropsToChildren} from "../../passPropsToChildren";

interface IComponentProps {
    line?: number;
    options?: {[property: string]: ConfigProperty; }
}

const possibleTransportValues = [
    'DNSnaptr',
    'TCPpreferred',
    'UDPOnly',
    'TLS',
    'TCPOnly'
];

export const ProxyProps = (props: IComponentProps) => (
    <PassPropsToChildren options={props.options}>
        <h4>Line {props.line}</h4>
        <TextPropertyContainer propertyName={`reg${props.line}Address`} defaultValue=''>
            Address
        </TextPropertyContainer>
        <DropdownPropertyContainer propertyName={`reg${props.line}Transport`} possibleValues={possibleTransportValues} defaultValue='UDPOnly'>
            Transport
        </DropdownPropertyContainer>
        <TextPropertyContainer propertyName={`reg${props.line}Port`} isInteger defaultValue={0} min={0} max={65535}>
            Port
        </TextPropertyContainer>
        <TimeSpanPropertyContainer propertyName={`reg${props.line}Expires`} defaultValue={3600} min={10}>
            Expires
        </TimeSpanPropertyContainer>
        <TimeSpanPropertyContainer propertyName={`reg${props.line}Overlap`} defaultValue={60} min={5} max={65535}>
            Overlap
        </TimeSpanPropertyContainer>
    </PassPropsToChildren>
);