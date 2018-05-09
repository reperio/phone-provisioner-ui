import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/configActions';
import {BooleanPropertyContainer} from "../properties/booleanProperty";
import {TextPropertyContainer} from "../properties/textProperty";
import {SortableListPropertyContainer} from "../properties/sortableListProperty";
import {DropdownPropertyContainer} from "../properties/dropdownProperty";
import {ConfigProperty, Organization} from "../../../store/store";
import {container as PolycomConfig} from "./polycomConfig";
import {PassPropsToChildren} from "../../passPropsToChildren";
import {TimePropertyContainer} from "../properties/timeProperty";
import {TimeSpanPropertyContainer} from "../properties/timeSpanProperty";
import ConfigHeader from '../configHeader';
import {PageComponentProps} from "./pageComponentProps";

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
const possibleCallBackModeValues = ['contact', 'registration', 'disabled'];

class SoundpointIPConfig extends React.Component<PageComponentProps, {}> {
    props: PageComponentProps;

    render() {
        const pollingEnabled = this.props.options.pollingEnabled.getValue();
        const pollingMode = this.props.options.pollingMode.getValue();
        const vadEnable = this.props.options.vadEnable.getValue();
        const mwi1_callBackMode = this.props.options.mwi1_callBackMode.getValue();
        const mwi2_callBackMode = this.props.options.mwi2_callBackMode.getValue();
        const mwi3_callBackMode = this.props.options.mwi3_callBackMode.getValue();
        const mwi4_callBackMode = this.props.options.mwi4_callBackMode.getValue();
        const mwi5_callBackMode = this.props.options.mwi5_callBackMode.getValue();
        const mwi6_callBackMode = this.props.options.mwi6_callBackMode.getValue();
        return (
            <PassPropsToChildren options={this.props.options} organization={this.props.organization} isBaseOption={this.props.base}>
                <PolycomConfig base={false}/>

                <ConfigHeader/>
                <TextPropertyContainer propertyName='digitMap'>Digit Map</TextPropertyContainer>
                <BooleanPropertyContainer propertyName='tagSerialNo'>Tag Serial Number</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName='oneTouchVoiceMail'>One Touch Voicemail</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName='ztpEnabled'>ZTP Enabled</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName='presence'>Presence</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName='messaging'>Messaging</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName='callWaiting'>Call Waiting</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName='urlDialing'>URL Dialing</BooleanPropertyContainer>

                <SortableListPropertyContainer propertyName='codecPref' possibleValues={possibleCodecPrefValues}>Codec Preference</SortableListPropertyContainer>

                <h3>Message Waiting</h3>
                <ConfigHeader/>
                <h4>MWI-1</h4>
                <DropdownPropertyContainer propertyName='mwi1_callBackMode' possibleValues={possibleCallBackModeValues}>Callback Mode</DropdownPropertyContainer>
                <TextPropertyContainer propertyName='mwi1_callBack' hidden={mwi1_callBackMode === 'disabled'}>Callback</TextPropertyContainer>
                <h4>MWI-2</h4>
                <DropdownPropertyContainer propertyName='mwi2_callBackMode' possibleValues={possibleCallBackModeValues}>Callback Mode</DropdownPropertyContainer>
                <TextPropertyContainer propertyName='mwi2_callBack'hidden={mwi2_callBackMode === 'disabled'}>Callback</TextPropertyContainer>
                <h4>MWI-3</h4>
                <DropdownPropertyContainer propertyName='mwi3_callBackMode' possibleValues={possibleCallBackModeValues}>Callback Mode</DropdownPropertyContainer>
                <TextPropertyContainer propertyName='mwi3_callBack'hidden={mwi3_callBackMode === 'disabled'}>Callback</TextPropertyContainer>
                <h4>MWI-4</h4>
                <DropdownPropertyContainer propertyName='mwi4_callBackMode' possibleValues={possibleCallBackModeValues}>Callback Mode</DropdownPropertyContainer>
                <TextPropertyContainer propertyName='mwi4_callBack'hidden={mwi4_callBackMode === 'disabled'}>Callback</TextPropertyContainer>
                <h4>MWI-5</h4>
                <DropdownPropertyContainer propertyName='mwi5_callBackMode' possibleValues={possibleCallBackModeValues}>Callback Mode</DropdownPropertyContainer>
                <TextPropertyContainer propertyName='mwi5_callBack'hidden={mwi5_callBackMode === 'disabled'}>Callback</TextPropertyContainer>
                <h4>MWI-6</h4>
                <DropdownPropertyContainer propertyName='mwi6_callBackMode' possibleValues={possibleCallBackModeValues}>Callback Mode</DropdownPropertyContainer>
                <TextPropertyContainer propertyName='mwi6_callBack'hidden={mwi6_callBackMode === 'disabled'}>Callback</TextPropertyContainer>

                <h3>Provisioning Polling</h3>
                <ConfigHeader/>
                <BooleanPropertyContainer propertyName='pollingEnabled'>Enabled</BooleanPropertyContainer>
                <DropdownPropertyContainer propertyName='pollingMode' possibleValues={['abs', 'rel', 'random']} hidden={!pollingEnabled}>
                    Mode
                </DropdownPropertyContainer>
                <TimeSpanPropertyContainer propertyName='pollingPeriod' min={1} hidden={!pollingEnabled}>
                    Period
                </TimeSpanPropertyContainer>
                <TimePropertyContainer propertyName='pollingTime' hidden={!pollingEnabled}>
                    Time
                </TimePropertyContainer>
                <TimePropertyContainer propertyName='pollingTimeRandomEnd' hidden={!pollingEnabled || pollingMode !== 'random'}>
                    Random End
                </TimePropertyContainer>

                <h3>SNTP</h3>
                <ConfigHeader/>
                <TextPropertyContainer propertyName='sntpAddress'>Address</TextPropertyContainer>
                <TimeSpanPropertyContainer propertyName='sntpGmtOffset'>GMT Offset</TimeSpanPropertyContainer>
                <TimeSpanPropertyContainer propertyName='sntpResyncPeriod' min={1}>Resync Period</TimeSpanPropertyContainer>

                <h3>Voice Activity Detection</h3>
                <ConfigHeader/>
                <BooleanPropertyContainer propertyName='vadEnable'>Enable</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName='vadSignalAnnexB'>Signal Annex B</BooleanPropertyContainer>
                <TextPropertyContainer propertyName='vadThresh' isInteger min={0} max={30} hidden={!vadEnable}>
                    Threshold
                </TextPropertyContainer>

                <h3>Volume Persist</h3>
                <ConfigHeader/>
                <BooleanPropertyContainer propertyName='volumePersistHandset'>Handset</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName='volumePersistHeadset'>Headset</BooleanPropertyContainer>
                <BooleanPropertyContainer propertyName='volumePersistHandsFree'>Hands Free</BooleanPropertyContainer>
            </PassPropsToChildren>
        );
    }
}

function mapDispatchToProps(dispatch:any) : PageComponentProps {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export const container = connect<PageComponentProps, PageComponentProps, PageComponentProps>(
    null,
    mapDispatchToProps
)(SoundpointIPConfig);
