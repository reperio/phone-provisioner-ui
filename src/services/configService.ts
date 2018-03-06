import axios from 'axios';

export async function getManufacturers() {
    const manufacturers = await axios.get('http://localhost:3000/config/manufacturers');
    return manufacturers.data;
}