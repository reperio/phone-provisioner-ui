export enum ConfigLevel {
    DISABLED = -2,
    GLOBAL = -1,
    MANUFACTURER = 0,
    FAMILY = 1,
    MODEL = 2
}

const configLevelNames = [
    'Disabled',
    'Inherited from global',
    'Inherited from manufacturer',
    'Inherited from family',
    'Inherited from model'
];

export function ConfigLevelName(level: ConfigLevel) : string {
    return configLevelNames[level + 2];
}