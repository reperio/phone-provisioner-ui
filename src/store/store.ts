import {ConfigLevel} from "../constants/configLevel";

export class Store {
    configurationSettings: ConfigurationSettings;
}

export class ConfigurationSettings {
    anyUnsavedChanges: boolean;
    currentlyEditing: CurrentlyEditing;
    allConfigs: any[];
    currentOrganization: Organization;
    organizations: Organization[];
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

    constructor(inherited: boolean, inheritLevel: ConfigLevel, value: any, inheritedValue: any) {
        this.inherited = inherited;
        this.inheritLevel = inheritLevel;
        this.value = value;
        this.inheritedValue = inheritedValue;
    }

    getValue() : any {
        return this.inherited ? this.inheritedValue : this.value;
    }
}

export class Organization {
    id: string;
    is_global_organization: boolean;
    name: string;
}