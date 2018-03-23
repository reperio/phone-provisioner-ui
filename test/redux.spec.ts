import * as assert from 'assert'; //import doesn't work in tests because of the module in tsconfig
import reducer from '../src/reducers';
import {Store, CurrentlyEditing} from '../src/store/store';
import {ActionTypes} from "../src/constants/actionTypes";
import {ConfigLevel} from "../src/constants/configLevel";

const initialState: Store = {
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: []
    }
}

const initialStateWithManufacturerLoaded: Store = {
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: [
            {
                component_name: "polycomConfig",
                config: '{"test": true}',
                default_config: '{"test": false, "test2": "Inherited!"}',
                id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
                name: "Polycom",
                expanded: false,
                children: null,
            }
        ]
    }
}

const initialStateWithFamilyLoaded: Store = {
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: [
            {
                component_name: "polycomConfig",
                config: '{"test": true}',
                default_config: '{"test": false, "test2": "Inherited!"}',
                id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
                name: "Polycom",
                expanded: true,
                children: [
                    {
                        component_name: "soundpointIPConfig",
                        config: '{"test2":"ayy"}',
                        default_config: '{"something":""}',
                        id: "188a8ddd-9a57-4f45-aac2-effd96933039",
                        manufacturer: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
                        name: "Soundpoint IP",
                        expanded: false,
                        children: null,
                    }
                ]
            }
        ]
    }
}

const manufacturerCurrentlyEditing: CurrentlyEditing = {
    hierarchy: [
        {
            component_name: "polycomConfig",
            config: '{"test": true}',
            default_config: '{"test": false, "test2": "Inherited!"}',
            id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
            name: "Polycom",
            expanded: false,
            children: null,
        }
    ],
    options: {
        test: {inherited: false, inheritLevel: ConfigLevel.DEFAULT, value: true, inheritedValue: false },
        test2: {inherited: true, inheritLevel: ConfigLevel.DEFAULT, value: "Inherited!", inheritedValue: "Inherited!" }
    }
};

const familyCurrentlyEditing: CurrentlyEditing = {
    hierarchy: [
        {
            component_name: "polycomConfig",
            config: '{"test": true}',
            default_config: '{"test": false, "test2": "Inherited!"}',
            id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
            name: "Polycom",
            expanded: true,
            children: [
                {
                    component_name: "soundpointIPConfig",
                    config: '{"test2":"ayy"}',
                    default_config: '{"something":""}',
                    id: "188a8ddd-9a57-4f45-aac2-effd96933039",
                    manufacturer: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
                    name: "Soundpoint IP",
                    expanded: false,
                    children: null,
                }
            ],
        },
        {
            component_name: "soundpointIPConfig",
            config: '{"test2":"ayy"}',
            default_config: '{"something":""}',
            id: "188a8ddd-9a57-4f45-aac2-effd96933039",
            manufacturer: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
            name: "Soundpoint IP",
            expanded: false,
            children: null,
        }
    ],
    options: {
        test: {inherited: true, inheritLevel: ConfigLevel.MANUFACTURER, value: true, inheritedValue: true },
        test2: {inherited: false, inheritLevel: ConfigLevel.DEFAULT, value: "ayy", inheritedValue: "Inherited!" },
        something: {inherited: true, inheritLevel: ConfigLevel.DEFAULT, value: "", inheritedValue: ""}
    }
};

const initialStateWithFamilyLoadedButHidden: Store = {
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: [
            {
                component_name: "polycomConfig",
                config: '{"test": true}',
                default_config: '{"test": false, "test2": "Inherited!"}',
                id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
                name: "Polycom",
                expanded: false,
                children: [
                    {
                        component_name: "soundpointIPConfig",
                        config: '{"test2":"ayy"}',
                        default_config: '{"something":""}',
                        id: "188a8ddd-9a57-4f45-aac2-effd96933039",
                        manufacturer: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
                        name: "Soundpoint IP",
                        expanded: false,
                        children: null,
                    }
                ]
            }
        ]
    }
}

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

    it('loads families when the expand action is called', () => {
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

    it('hides families when the expand action is called again', () => {
        const newState:any = reducer(initialStateWithFamilyLoaded, {
            type: ActionTypes.EXPAND_CONFIG_GROUP,
            id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
            children: null
        });

        assert.deepEqual(newState.configurationSettings, initialStateWithFamilyLoadedButHidden.configurationSettings);
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
});