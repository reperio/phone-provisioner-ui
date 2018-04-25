import axios from 'axios';
import {ConfigLevel} from "../constants/configLevel";
import {ConfigProperty} from "../store/store";

export async function getManufacturers(organization: string) {
    const manufacturers = await axios.get(`http://localhost:3000/config/${organization}/manufacturers`);
    return manufacturers.data;
}

export async function getFamilies(manufacturer: string, organization: string) {
    const families = await axios.get(`http://localhost:3000/config/${organization}/families/${manufacturer}`);
    return families.data;
}

export async function getModels(family: string, organization: string) {
    const models = await axios.get(`http://localhost:3000/config/${organization}/models/${family}`);
    return models.data;
}

export async function getChildren(configLevel: ConfigLevel, id: string, organization: string) {
    switch(configLevel) {
        case ConfigLevel.MANUFACTURER:
            return await getFamilies(id, organization);
        case ConfigLevel.FAMILY:
            return await getModels(id, organization);
        default:
            return [];
    }
}

export async function updateManufacturerConfig(manufacturer: string, config: any, organization: string) {
    const newObj = await axios.post(`http://localhost:3000/config/${organization}/update-manufacturer-config`, {
        id: manufacturer,
        config
    });
    return newObj.data;
}

export async function updateFamilyConfig(family: string, config: any, organization: string) {
    const newObj = await axios.post(`http://localhost:3000/config/${organization}/update-family-config`, {
        id: family,
        config
    });
    return newObj.data;
}

export async function updateModelConfig(model: string, config: any, organization: string) {
    const newObj = await axios.post(`http://localhost:3000/config/${organization}/update-model-config`, {
        id: model,
        config
    });
    return newObj.data;
}

export async function updateConfig(configLevel: ConfigLevel, id: string, config: any, organization: string) {
    switch(configLevel) {
        case ConfigLevel.MANUFACTURER:
            return await updateManufacturerConfig(id, config, organization);
        case ConfigLevel.FAMILY:
            return await updateFamilyConfig(id, config, organization);
        case ConfigLevel.MODEL:
            return await updateModelConfig(id, config, organization);
        default:
            return {};
    }
}

export function configFromOptions(options: {[property: string]: ConfigProperty; }) : any {
    let config: any = {};
    for(let prop in options) {
        if(!options[prop].inherited) {
            config[prop] = options[prop].value;
        }
    }
    return config;
}