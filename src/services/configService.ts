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
            return getFamilies(id);
        case ConfigLevel.FAMILY:
            return getModels(id);
        default:
            return [];
    }
}