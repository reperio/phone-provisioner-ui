import axios from 'axios';
import {ConfigLevel} from "../constants/configLevel";

export async function getManufacturers() {
    const manufacturers = await axios.get('http://localhost:3000/config/manufacturers');
    return manufacturers.data;
}

export async function getFamilies(manufacturer: string) {
    const families = await axios.get(`http://localhost:3000/config/families/${manufacturer}`);
    return families.data;
}

export async function getModels(family: string) {
    const models = await axios.get(`http://localhost:3000/config/models/${family}`);
    return models.data;
}

export async function getChildren(configLevel: ConfigLevel, id: string) {
    switch(configLevel) {
        case ConfigLevel.MANUFACTURER:
            return await getFamilies(id);
        case ConfigLevel.FAMILY:
            return await getModels(id);
        default:
            return [];
    }
}

export async function updateManufacturerConfig(manufacturer: string, config: any) {
    const newObj = await axios.post('http://localhost:3000/config/update-manufacturer-config', {
        id: manufacturer,
        config
    });
    return newObj.data;
}

export async function updateFamilyConfig(family: string, config: any) {
    const newObj = await axios.post('http://localhost:3000/config/update-family-config', {
        id: family,
        config
    });
    return newObj.data;
}

export async function updateModelConfig(model: string, config: any) {
    const newObj = await axios.post('http://localhost:3000/config/update-model-config', {
        id: model,
        config
    });
    return newObj.data;
}

export async function updateConfig(configLevel: ConfigLevel, id: string, config: any) {
    switch(configLevel) {
        case ConfigLevel.MANUFACTURER:
            return await updateManufacturerConfig(id, config);
        case ConfigLevel.FAMILY:
            return await updateFamilyConfig(id, config);
        case ConfigLevel.MODEL:
            return await updateModelConfig(id, config);
        default:
            return {};
    }
}