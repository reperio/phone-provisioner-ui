import {CurrentlyEditing, Store, ConfigProperty, ConfigurationSettings} from "../src/store/store";
import {ConfigLevel} from "../src/constants/configLevel";
import {OrganizationType} from "../src/constants/organizationType";

const currentOrganization = {
    name: 'Test',
    id: '1',
    type: OrganizationType.NORMAL
}

const organizations = [
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

const polycomConfig: any = {
    component_name: "polycomConfig",
    config: '{"test": true}',
    default_config: '{"test": false, "test2": "Inherited!"}',
    id: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
    name: "Polycom",
    expanded: false,
    children: null,
};

const soundpointIPConfig: any = {
    component_name: "soundpointIPConfig",
    config: '{"test2":"ayy"}',
    default_config: '{"something":""}',
    id: "188a8ddd-9a57-4f45-aac2-effd96933039",
    manufacturer: "fb6c87ee-5968-45f4-bf3e-0d82d812fec7",
    name: "Soundpoint IP",
    expanded: false,
    children: null
};

const soundpointIP330Config: any = {
    component_name: "soundpointIP330Config",
        config: '{}',
    default_config: '{"extra": "hey"}',
    id: "646e4a66-823c-48fc-80e1-547cb5f67532",
    family: "188a8ddd-9a57-4f45-aac2-effd96933039",
    name: "330",
    expanded: false,
    children: null
};

const soundpointIP335Config: any = {
    component_name: "soundpointIP335Config",
        config: '{}',
    default_config: '{"extra2": true}',
    id: "1ceebd84-b735-4a90-ac51-854c7ac01b2c",
    family: "188a8ddd-9a57-4f45-aac2-effd96933039",
    name: "335",
    expanded: false,
    children: null
};

const soundpointIPConfigWithModels: any =
    Object.assign({}, soundpointIPConfig, {
        children: [soundpointIP330Config, soundpointIP335Config],
        expanded: true
    });

const polycomConfigWithFamily: any =
    Object.assign({}, polycomConfig, {children: [soundpointIPConfig], expanded: true});

const polycomConfigWithFamilyButHidden: any =
    Object.assign({}, polycomConfig, {children: [soundpointIPConfig]});

const polycomConfigWithFamilyAndModels: any =
    Object.assign({}, polycomConfig, {children: [soundpointIPConfigWithModels], expanded: true});

export const configurationSettings: ConfigurationSettings = {
    anyUnsavedChanges: false,
    currentlyEditing: null,
    allConfigs: [],
    currentOrganization: null,
    organizations: []
}

export const initialState = {configurationSettings};

export const initialStateWithOrganizationsLoaded: Store = {
    configurationSettings: Object.assign({}, configurationSettings, {currentOrganization, organizations})
}

export const initialStateWithManufacturerLoaded: Store = {
    configurationSettings: Object.assign({}, configurationSettings, {allConfigs: [polycomConfig]})
}

export const initialStateWithManufacturerAndOrganizationsLoaded: Store = {
    configurationSettings: Object.assign({}, configurationSettings, {
        allConfigs: [polycomConfig],
        currentOrganization,
        organizations
    })
}

export const initialStateWithFamilyLoaded: Store = {
    configurationSettings: Object.assign({}, configurationSettings, {allConfigs: [polycomConfigWithFamily]})
}

export const initialStateWithFamilyLoadedButHidden: Store = {
    configurationSettings: Object.assign({}, configurationSettings, {allConfigs: [polycomConfigWithFamilyButHidden]})
}

export const initialStateWithFamilyAndOrganizationsLoaded: Store = {
    configurationSettings: Object.assign({}, configurationSettings, {
        allConfigs: [polycomConfigWithFamily],
        currentOrganization,
        organizations
    })
}

export const initialStateWithModelsLoaded: Store = {
    configurationSettings: Object.assign({}, configurationSettings, {allConfigs: [polycomConfigWithFamilyAndModels]})
}

export const initialStateWithModelsAndOrganizationsLoaded: Store = {
    configurationSettings: Object.assign({}, configurationSettings, {
        allConfigs: [polycomConfigWithFamilyAndModels],
        currentOrganization,
        organizations
    })
}

export const manufacturerCurrentlyEditing: CurrentlyEditing = {
    hierarchy: [polycomConfig],
    options: {
        test: new ConfigProperty(false, ConfigLevel.GLOBAL, true, false),
        test2: new ConfigProperty(true, ConfigLevel.GLOBAL, "Inherited!", "Inherited!")
    }
};

export const initialStateWithManufacturerLoadedAndSelected: Store = {
    configurationSettings: Object.assign({}, configurationSettings, {
        allConfigs: [polycomConfig],
        currentlyEditing: manufacturerCurrentlyEditing
    })
}

export const familyCurrentlyEditing: CurrentlyEditing = {
    hierarchy: [polycomConfigWithFamily, soundpointIPConfig],
    options: {
        test: new ConfigProperty(true, ConfigLevel.MANUFACTURER, true, true),
        test2: new ConfigProperty(false, ConfigLevel.GLOBAL, "ayy", "Inherited!"),
        something: new ConfigProperty(true, ConfigLevel.GLOBAL, "", "")
    }
};

export const modelCurrentlyEditing: CurrentlyEditing = {
    hierarchy: [polycomConfigWithFamilyAndModels, soundpointIPConfigWithModels, soundpointIP330Config],
    options: {
        test: new ConfigProperty(true, ConfigLevel.MANUFACTURER, true, true),
        test2: new ConfigProperty(true, ConfigLevel.FAMILY, "ayy", "ayy"),
        something: new ConfigProperty(true, ConfigLevel.GLOBAL, "", ""),
        extra: new ConfigProperty(true, ConfigLevel.GLOBAL, "hey", "hey")
    }
};