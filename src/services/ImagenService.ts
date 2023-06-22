import { URL_API_BASE } from "../constants";

export async function findImagenByName(nombre: string, token: string) {
    if (!nombre) return;

    try {
        const response = await fetch(`${URL_API_BASE}/imagenes/byName/${nombre}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.blob();
        const imagenUrl = URL.createObjectURL(data);

        return imagenUrl;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function saveImagen(file: File, nombre: string, token: string) {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${URL_API_BASE}/imagenes/${nombre}`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                "enctype": "multipart/form-data"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.blob();
        const imagenUrl = URL.createObjectURL(data);

        return imagenUrl;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}