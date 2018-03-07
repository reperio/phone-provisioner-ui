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

export async function createManufacturer(name: string) {
    const manufacturer = await axios.post(
        'http://localhost:3000/config/create-manufacturer',
        {
            name: name,
            config: {}
        }
    );
    return manufacturer.data;
}

export async function createFamily(name: string, manufacturer: string) {
    const family = await axios.post(
        'http://localhost:3000/config/create-family',
        {
            name,
            manufacturer,
            config: {}
        }
    );
    return family.data;
}

export async function createModel(name: string, family: string) {
    const model = await axios.post(
        'http://localhost:3000/config/create-model',
        {
            name,
            family,
            config: {}
        }
    );
    return model.data;
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

export async function createConfigGroup(configLevel: ConfigLevel, name: string, parent: string) {
    switch(configLevel) {
        case ConfigLevel.MANUFACTURER:
            await createManufacturer(name);
            break;
        case ConfigLevel.FAMILY:
            await createFamily(name, parent);
            break;
        case ConfigLevel.MODEL:
            await createModel(name, parent);
            break;
    }
}