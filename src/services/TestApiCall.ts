import { useAuth0 } from "@auth0/auth0-react";

const { getAccessTokenSilently } = useAuth0();
const AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE as string;
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

export const callPublicApi = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`);
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert("Error");
    }
};

export const callPrivateApi = async () => {
    try {
        const token = await getAccessTokenSilently({
            authorizationParams: {
                audience: AUDIENCE,
            },
        });

        const response = await fetch(`${API_BASE_URL}/private`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert("Error");
    }
};

export const callAdminApi = async () => {
    try {
        const token = await getAccessTokenSilently({
            authorizationParams: {
                audience: AUDIENCE,
            },
        });

        const response = await fetch(`${API_BASE_URL}/admin`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert("Error");
    }
};