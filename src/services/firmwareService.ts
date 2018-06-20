import axios from 'axios';

declare const API_URL: string;

export async function getFiles() : Promise<string[]> {
    const files = await axios.get(`${API_URL}/firmware/files`);
    return files.data;
}

export async function addFiles(files: FileList) {
    let form = new FormData();
    for(let i = 0; i < files.length; i++) {
        form.append('files', files[i]);
    }

    axios.post(`${API_URL}/firmware/add-files`, form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function deleteFile(filename: string) {
    await axios.post(`${API_URL}/firmware/remove-file`, {filename});
}