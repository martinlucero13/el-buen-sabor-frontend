import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Rubro } from "../types/Rubro";
import { Endpoint } from "../types/Endpoint";
import { findById } from "../services/BaseService";

/**
 * Hook personalizado para obtener un Rubro por su ID.
 * @param id ID del Rubro a buscar.
 * @returns Un objeto que contiene el estado del Rubro.
 */
export const useRubro = (id: number) => {
    const [rubro, setRubro] = useState<Rubro>({ id: 0, denominacion: '', esInsumo: true, bloqueado: false });
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getRubroById();
    }, [id]);

    const getRubroById = async () => {
        if (id !== -1) {
            const token = await getAccessTokenSilently();
        
            const newRubro = await findById<Rubro>(Endpoint.Rubro, id, token);
            setRubro(newRubro);
        }
    };

    return { rubro };
};