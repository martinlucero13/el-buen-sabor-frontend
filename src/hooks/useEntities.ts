import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Base } from "../types/Base"
import { Endpoint } from "../types/Endpoint";
import { findAll, findAllSimple } from "../services/BaseService";

/**
 * Hook personalizado para obtener todas las entidades de un endpoint específico.
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @returns  Un objeto que contiene el estado de las entidades.
 */
export const useEntities = <T extends Base>(endpoint: Endpoint, reload?: boolean, isSimple?: boolean) => {
    const [entities, setEntities] = useState<T[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAll();
    }, [reload]);

    const getAll = async () => {
        const token = await getAccessTokenSilently();

        if (isSimple) {
            const newEntities = await findAllSimple<T>(endpoint, token);
            setEntities(newEntities);
        } else {
            const newEntities = await findAll<T>(endpoint, token);
            setEntities(newEntities);
        }
    };

    return { entities };
};