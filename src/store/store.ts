export class Store {
    test: any;
    note: any;
    configurationSettings: ConfigurationSettings;
}

export class ConfigurationSettings {
    currentlyEditing: CurrentlyEditing;
    allConfigs: any[];
}

export class CurrentlyEditing {
    hierarchy: any[];
    options: {[property: string]: ConfigProperty; };
}

export class ConfigProperty {
    inherited: boolean;
    value: any;
    inheritedValue: any;
}