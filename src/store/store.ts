import {ConfigLevel} from "../constants/configLevel";

export class Store {
    test: any;
    note: any;
    configurationSettings: ConfigurationSettings;
}

export class ConfigurationSettings {
    anyUnsavedChanges: boolean;
    currentlyEditing: CurrentlyEditing;
    allConfigs: any[];
}

export class CurrentlyEditing {
    hierarchy: any[];
    options: {[property: string]: ConfigProperty; };
}

export class ConfigProperty {
    inherited: boolean;
    inheritLevel: ConfigLevel;
    value: any;
    inheritedValue: any;
}