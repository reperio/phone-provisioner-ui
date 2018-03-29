import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {BooleanPropertyContainer} from "../properties/booleanProperty";
import {TextPropertyContainer} from "../properties/textProperty";
import {SortableListPropertyContainer} from "../properties/sortableListProperty";
import {ConfigProperty} from "../../../store/store";
import {container as PolycomConfig} from "./polycomConfig";
import {PassPropsToChildren} from "../../passPropsToChildren";

const possibleCodecPrefValues: string[] = [
    'G711_A',
    'G711_Mu',
    'G722',
    'G7221.32kbps',
    'G7221_C.48kbps',
    'G729_AB',
    'Siren14.48kbps',
    'Siren22.64kbps'
];

interface IComponentProps {
    actions?: any;
    options?: {[property: string]: ConfigProperty; };
}

class SoundpointIPConfig extends React.Component<IComponentProps, {}> {
    props: IComponentProps;

    render() {
        return (
            <PassPropsToChildren options={this.props.options}>
                <PolycomConfig/>
                {/*
                    <TextPropertyContainer propertyName={'digitMap'}>Digit Map</TextPropertyContainer>
                    <BooleanPropertyContainer propertyName={'tagSerialNo'}>Tag Serial Number</BooleanPropertyContainer>
                    <BooleanPropertyContainer propertyName={'tagSerialNo'}>Tag Serial Number</BooleanPropertyContainer>
                    <BooleanPropertyContainer propertyName={'tagSerialNo'}>Tag Serial Number</BooleanPropertyContainer>
                    <BooleanPropertyContainer propertyName={'tagSerialNo'}>Tag Serial Number</BooleanPropertyContainer>
                    <BooleanPropertyContainer propertyName={'tagSerialNo'}>Tag Serial Number</BooleanPropertyContainer>
                    <BooleanPropertyContainer propertyName={'tagSerialNo'}>Tag Serial Number</BooleanPropertyContainer>
                    <BooleanPropertyContainer propertyName={'tagSerialNo'}>Tag Serial Number</BooleanPropertyContainer>
                    <BooleanPropertyContainer propertyName={'tagSerialNo'}>Tag Serial Number</BooleanPropertyContainer>
                */}
                <SortableListPropertyContainer propertyName={'codecPref'} possibleValues={possibleCodecPrefValues}>Codec Preference</SortableListPropertyContainer>
            </PassPropsToChildren>
        );
    }
}

function mapDispatchToProps(dispatch:any) : IComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export const container = connect<IComponentProps, IComponentProps, IComponentProps>(
    null,
    mapDispatchToProps
)(SoundpointIPConfig);
