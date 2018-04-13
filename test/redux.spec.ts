import * as assert from 'assert';
import reducer from '../src/reducers';
import {ActionTypes} from "../src/constants/actionTypes";
import {
    initialState,
    initialStateWithManufacturerLoaded,
    initialStateWithFamilyLoaded,
    initialStateWithModelLoaded,
    initialStateWithFamilyLoadedButHidden,
    manufacturerCurrentlyEditing,
    familyCurrentlyEditing,
    modelCurrentlyEditing,
    manufacturerLoadedAndSelected
} from "./reduxStores";
import * as ConfigService from "../src/services/configService";

describe('The Redux store', () => {
    it('loads manufacturers into the config tree', () => {
        const newState:any = reducer(initialState, {
            type: ActionTypes.GET_MANUFACTURERS,
            manufacturers: [
                {
                    component_name: "polycomConfig",
                    config: '{"test": true}',
                    default_config: '{"test": false, "test2": "Inherited!"}',
                    id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
                    name: "Polycom"
                }
            ]
        });

        assert.deepEqual(newState.configurationSettings, initialStateWithManufacturerLoaded.configurationSettings);
    });

    it('loads families when the expand action is called on the manufacturer', () => {
        const newState:any = reducer(initialStateWithManufacturerLoaded, {
            type: ActionTypes.EXPAND_CONFIG_GROUP,
            id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
            children: [
                {
                    component_name: "soundpointIPConfig",
                    config: '{"test2":"ayy"}',
                    default_config: '{"something":""}',
                    id: "188a8ddd-9a57-4f45-aac2-effd96933039",
                    manufacturer: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
                    name: "Soundpoint IP",
                }
            ]
        });

        assert.deepEqual(newState.configurationSettings, initialStateWithFamilyLoaded.configurationSettings);
    });

    it('hides families when the expand action is called on the manufacturer again', () => {
        const newState:any = reducer(initialStateWithFamilyLoaded, {
            type: ActionTypes.EXPAND_CONFIG_GROUP,
            id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
            children: null
        });

        assert.deepEqual(newState.configurationSettings, initialStateWithFamilyLoadedButHidden.configurationSettings);
    });

    it('loads models when the expand action is called on the family', () => {
        const newState:any = reducer(initialStateWithFamilyLoaded, {
            type: ActionTypes.EXPAND_CONFIG_GROUP,
            id: "188a8ddd-9a57-4f45-aac2-effd96933039",
            children: [
                {
                    component_name: "soundpointIP330Config",
                    config: '{}',
                    default_config: '{"extra": "hey"}',
                    id: "646e4a66-823c-48fc-80e1-547cb5f67532",
                    family: "188a8ddd-9a57-4f45-aac2-effd96933039",
                    name: "330"
                },
                {
                    component_name: "soundpointIP335Config",
                    config: '{}',
                    default_config: '{"extra2": true}',
                    id: "1ceebd84-b735-4a90-ac51-854c7ac01b2c",
                    family: "188a8ddd-9a57-4f45-aac2-effd96933039",
                    name: "335"
                }
            ]
        });

        assert.deepEqual(newState.configurationSettings, initialStateWithModelLoaded.configurationSettings);
    });

    it('opens up the correct config editor when you select the manufacturer', () => {
        const newState:any = reducer(initialStateWithManufacturerLoaded, {
            type: ActionTypes.SELECT_CONFIG,
            id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7"
        });

        assert.deepEqual(newState.configurationSettings.currentlyEditing, manufacturerCurrentlyEditing);
    });

    it('opens up the correct config editor when you select the family', () => {
        const newState:any = reducer(initialStateWithFamilyLoaded, {
            type: ActionTypes.SELECT_CONFIG,
            id: "188a8ddd-9a57-4f45-aac2-effd96933039"
        });

        assert.deepEqual(newState.configurationSettings.currentlyEditing, familyCurrentlyEditing);
    });

    it('opens up the correct config editor when you select the model', () => {
        const newState:any = reducer(initialStateWithModelLoaded, {
            type: ActionTypes.SELECT_CONFIG,
            id: "646e4a66-823c-48fc-80e1-547cb5f67532"
        });

        assert.deepEqual(newState.configurationSettings.currentlyEditing, modelCurrentlyEditing);
    });

    it('correctly updates the edit page when you toggle the override status on a property', () => {
        const newState:any = reducer(manufacturerLoadedAndSelected, {
            type: ActionTypes.TOGGLE_PROPERTY_INHERITANCE,
            property: "test",
            inherit: true
        });

        assert(newState.configurationSettings.currentlyEditing.options.test.inherited);
    });

    it('correctly updates the config tree when you toggle the override status on a property and then save', () => {
        let newState:any = reducer(manufacturerLoadedAndSelected, {
            type: ActionTypes.TOGGLE_PROPERTY_INHERITANCE,
            property: "test",
            inherit: true
        });
        const config = ConfigService.configFromOptions(newState.configurationSettings.currentlyEditing.options);
        newState = reducer(newState, {
            type: ActionTypes.SAVE_PROPERTY_OPTIONS,
            config,
            id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7"
        });

        assert.deepEqual(JSON.parse(newState.configurationSettings.allConfigs[0].config), {});
    });

    it('correctly updates the edit page when you change the value of a property', () => {
        const newState:any = reducer(manufacturerLoadedAndSelected, {
            type: ActionTypes.CHANGE_PROPERTY_VALUE,
            property: "test",
            value: false
        });

        assert.equal(newState.configurationSettings.currentlyEditing.options.test.value, false);
    });

    it('correctly updates the config tree when you change the value of a property and then save', () => {
        let newState:any = reducer(manufacturerLoadedAndSelected, {
            type: ActionTypes.CHANGE_PROPERTY_VALUE,
            property: "test",
            value: false
        });
        const config = ConfigService.configFromOptions(newState.configurationSettings.currentlyEditing.options);
        newState = reducer(newState, {
            type: ActionTypes.SAVE_PROPERTY_OPTIONS,
            config,
            id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7"
        });

        assert.deepEqual(JSON.parse(newState.configurationSettings.allConfigs[0].config), {test: false});
    });
});