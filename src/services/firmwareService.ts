import axios from 'axios';

declare const API_URL: string;

export async function getFiles() : Promise<string[]> {
    const files = await axios.get(`${API_URL}/firmware/files`);
    return files.data;
}

export async function addFiles() {

}

export async function deleteFile(filename: string) {
    await axios.post(`${API_URL}/firmware/remove-file`, {filename});
}