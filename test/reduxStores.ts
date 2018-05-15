import {CurrentlyEditing, Store, ConfigProperty} from "../src/store/store";
import {ConfigLevel} from "../src/constants/configLevel";
import {OrganizationType} from "../src/constants/organizationType";

export const initialState: Store = {
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: [],
        currentOrganization: null,
        organizations: []
    }
}

export const initialStateWithOrganizationsLoaded: Store = {
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: [],
        currentOrganization: {
            name: 'Test',
            id: '1',
            type: OrganizationType.NORMAL
        },
        organizations: [
            {
                name: 'Test',
                id: '1',
                type: OrganizationType.NORMAL
            },
            {
                name: 'Test2',
                id: '2',
                type: OrganizationType.NORMAL
            }
        ]
    }
}

export const initialStateWithManufacturerLoaded: Store = {
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
        ],
        currentOrganization: null,
        organizations: []
    }
}

export const initialStateWithManufacturerAndOrganizationsLoaded: Store = {
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
        ],
        currentOrganization: {
            name: 'Test',
            id: '1',
            type: OrganizationType.NORMAL
        },
        organizations: [
            {
                name: 'Test',
                id: '1',
                type: OrganizationType.NORMAL
            },
            {
                name: 'Test2',
                id: '2',
                type: OrganizationType.NORMAL
            }
        ]
    }
}

export const initialStateWithFamilyLoaded: Store = {
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
                        children: null
                    }
                ]
            }
        ],
        currentOrganization: null,
        organizations: []
    }
}

export const initialStateWithFamilyAndOrganizationsLoaded: Store = {
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
                        children: null
                    }
                ]
            }
        ],
        currentOrganization: {
            name: 'Test',
            id: '1',
            type: OrganizationType.NORMAL
        },
        organizations: [
            {
                name: 'Test',
                id: '1',
                type: OrganizationType.NORMAL
            },
            {
                name: 'Test2',
                id: '2',
                type: OrganizationType.NORMAL
            }
        ]
    }
}

export const initialStateWithFamilyLoadedButHidden: Store = {
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
                        children: null
                    }
                ]
            }
        ],
        currentOrganization: null,
        organizations: []
    }
}

export const initialStateWithModelLoaded: Store = {
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
                        expanded: true,
                        children: [
                            {
                                component_name: "soundpointIP330Config",
                                config: '{}',
                                default_config: '{"extra": "hey"}',
                                id: "646e4a66-823c-48fc-80e1-547cb5f67532",
                                family: "188a8ddd-9a57-4f45-aac2-effd96933039",
                                name: "330",
                                expanded: false,
                                children: null
                            },
                            {
                                component_name: "soundpointIP335Config",
                                config: '{}',
                                default_config: '{"extra2": true}',
                                id: "1ceebd84-b735-4a90-ac51-854c7ac01b2c",
                                family: "188a8ddd-9a57-4f45-aac2-effd96933039",
                                name: "335",
                                expanded: false,
                                children: null
                            }
                        ]
                    }
                ]
            }
        ],
        currentOrganization: null,
        organizations: []
    }
}

export const initialStateWithModelAndOrganizationsLoaded: Store = {
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
                        expanded: true,
                        children: [
                            {
                                component_name: "soundpointIP330Config",
                                config: '{}',
                                default_config: '{"extra": "hey"}',
                                id: "646e4a66-823c-48fc-80e1-547cb5f67532",
                                family: "188a8ddd-9a57-4f45-aac2-effd96933039",
                                name: "330",
                                expanded: false,
                                children: null
                            },
                            {
                                component_name: "soundpointIP335Config",
                                config: '{}',
                                default_config: '{"extra2": true}',
                                id: "1ceebd84-b735-4a90-ac51-854c7ac01b2c",
                                family: "188a8ddd-9a57-4f45-aac2-effd96933039",
                                name: "335",
                                expanded: false,
                                children: null
                            }
                        ]
                    }
                ]
            }
        ],
        currentOrganization: {
            name: 'Test',
            id: '1',
            type: OrganizationType.NORMAL
        },
        organizations: [
            {
                name: 'Test',
                id: '1',
                type: OrganizationType.NORMAL
            },
            {
                name: 'Test2',
                id: '2',
                type: OrganizationType.NORMAL
            }
        ]
    }
}

export const manufacturerCurrentlyEditing: CurrentlyEditing = {
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
        test: new ConfigProperty(false, ConfigLevel.GLOBAL, true, false),
        test2: new ConfigProperty(true, ConfigLevel.GLOBAL, "Inherited!", "Inherited!")
    }
};

export const familyCurrentlyEditing: CurrentlyEditing = {
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
        test: new ConfigProperty(true, ConfigLevel.MANUFACTURER, true, true),
        test2: new ConfigProperty(false, ConfigLevel.GLOBAL, "ayy", "Inherited!"),
        something: new ConfigProperty(true, ConfigLevel.GLOBAL, "", "")
    }
};

export const modelCurrentlyEditing: CurrentlyEditing = {
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
                    expanded: true,
                    children: [
                        {
                            component_name: "soundpointIP330Config",
                            config: '{}',
                            default_config: '{"extra": "hey"}',
                            id: "646e4a66-823c-48fc-80e1-547cb5f67532",
                            family: "188a8ddd-9a57-4f45-aac2-effd96933039",
                            name: "330",
                            expanded: false,
                            children: null
                        },
                        {
                            component_name: "soundpointIP335Config",
                            config: '{}',
                            default_config: '{"extra2": true}',
                            id: "1ceebd84-b735-4a90-ac51-854c7ac01b2c",
                            family: "188a8ddd-9a57-4f45-aac2-effd96933039",
                            name: "335",
                            expanded: false,
                            children: null
                        }
                    ],
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
            expanded: true,
            children: [
                {
                    component_name: "soundpointIP330Config",
                    config: '{}',
                    default_config: '{"extra": "hey"}',
                    id: "646e4a66-823c-48fc-80e1-547cb5f67532",
                    family: "188a8ddd-9a57-4f45-aac2-effd96933039",
                    name: "330",
                    expanded: false,
                    children: null
                },
                {
                    component_name: "soundpointIP335Config",
                    config: '{}',
                    default_config: '{"extra2": true}',
                    id: "1ceebd84-b735-4a90-ac51-854c7ac01b2c",
                    family: "188a8ddd-9a57-4f45-aac2-effd96933039",
                    name: "335",
                    expanded: false,
                    children: null
                }
            ],
        },
        {
            component_name: "soundpointIP330Config",
            config: '{}',
            default_config: '{"extra": "hey"}',
            id: "646e4a66-823c-48fc-80e1-547cb5f67532",
            family: "188a8ddd-9a57-4f45-aac2-effd96933039",
            name: "330",
            expanded: false,
            children: null
        }
    ],
    options: {
        test: new ConfigProperty(true, ConfigLevel.MANUFACTURER, true, true),
        test2: new ConfigProperty(true, ConfigLevel.FAMILY, "ayy", "ayy"),
        something: new ConfigProperty(true, ConfigLevel.GLOBAL, "", ""),
        extra: new ConfigProperty(true, ConfigLevel.GLOBAL, "hey", "hey")
    }
};

let temp = Object.assign({}, initialStateWithManufacturerLoaded);
temp.configurationSettings = Object.assign({}, temp.configurationSettings, {currentlyEditing: manufacturerCurrentlyEditing});
export const manufacturerLoadedAndSelected = temp;