export enum ConfigLevel {
    DISABLED = -4,
    GLOBAL_MANUFACTURER = -3,
    GLOBAL_FAMILY = -2,
    GLOBAL_MODEL = -1,
    MANUFACTURER = 0,
    FAMILY = 1,
    MODEL = 2
}

const configLevelNames = [
    'Disabled',
    'Inherited from global at manufacturer',
    'Inherited from global at family',
    'Inherited from global at model',
    'Inherited from manufacturer',
    'Inherited from family',
    'Inherited from model'
];

export function ConfigLevelName(level: ConfigLevel) : string {
    return configLevelNames[level + 4];
}