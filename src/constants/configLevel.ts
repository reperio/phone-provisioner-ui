export enum ConfigLevel {
    DEFAULT = -1,
    MANUFACTURER = 0,
    FAMILY = 1,
    MODEL = 2
}

const configLevelNames = [
    'default',
    'manufacturer',
    'family',
    'model'
];

export function ConfigLevelName(level: ConfigLevel) : string {
    return configLevelNames[level + 1];
}