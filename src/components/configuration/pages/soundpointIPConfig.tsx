import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {BooleanPropertyContainer} from "../properties/booleanProperty";
import {TextPropertyContainer} from "../properties/textProperty";
import {SortableListPropertyContainer} from "../properties/sortableListProperty";
import {DropdownPropertyContainer} from "../properties/dropdownProperty";
import {ConfigProperty} from "../../../store/store";
import {container as PolycomConfig} from "./polycomConfig";
import {PassPropsToChildren} from "../../passPropsToChildren";
import {TimeSpanPropertyContainer} from "../properties/timeSpanProperty";

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

                <TextPropertyContainer propertyName={'digitMap'}>Digit Map</TextPropertyContainer>
                <BooleanPropertyContainer propertyName={'tagSerialNo'}>Tag Serial Number</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName={'oneTouchVoiceMail'}>One Touch Voicemail</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName={'ztpEnabled'}>ZTP Enabled</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName={'presence'}>Presence</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName={'messaging'}>Messaging</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName={'callWaiting'}>Call Waiting</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName={'urlModeDialing'}>URL Mode Dialing</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName={'urlDialing'}>URL Dialing</BooleanPropertyContainer>

                <SortableListPropertyContainer propertyName={'codecPref'} possibleValues={possibleCodecPrefValues}>Codec Preference</SortableListPropertyContainer>

                <h3>Message Waiting</h3>
                <BooleanPropertyContainer propertyName={'bypassInstantMessage'}>Bypass Instant Message</BooleanPropertyContainer>
                {/*TODO: MWI properties*/}

                <h3>Provisioning Polling</h3>
                <BooleanPropertyContainer propertyName={'pollingEnabled'}>Enabled</BooleanPropertyContainer>
                <DropdownPropertyContainer propertyName={'pollingMode'} possibleValues={['abs', 'rel', 'random']}>Mode</DropdownPropertyContainer>
                <TextPropertyContainer propertyName={'pollingPeriod'} isInteger min={1}>Period</TextPropertyContainer>
                <TimeSpanPropertyContainer propertyName={'pollingTime'}>Time</TimeSpanPropertyContainer>
                <TimeSpanPropertyContainer propertyName={'pollingTimeRandomEnd'}>Random End</TimeSpanPropertyContainer>

                <h3>SNTP</h3>
                <TextPropertyContainer propertyName={'sntpAddress'}>Address</TextPropertyContainer>
                <TextPropertyContainer propertyName={'sntpGmtOffset'} isInteger>GMT Offset</TextPropertyContainer>
                <TextPropertyContainer propertyName={'sntpResyncPeriod'} isInteger min={1}>Resync Period</TextPropertyContainer>

                <h3>Voice Activity Detection</h3>
                <BooleanPropertyContainer propertyName={'vadEnable'}>Enable</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName={'vadSignalAnnexB'}>Signal Annex B</BooleanPropertyContainer>
                <TextPropertyContainer propertyName={'vadThresh'} isInteger min={0} max={30}>Threshold</TextPropertyContainer>

                <h3>Volume Persist</h3>
                <BooleanPropertyContainer propertyName={'volumePersistHandset'}>Handset</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName={'volumePersistHeadset'}>Headset</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName={'volumePersistHandsFree'}>Hands Free</BooleanPropertyContainer>
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
