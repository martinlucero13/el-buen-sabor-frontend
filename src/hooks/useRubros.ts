import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Endpoint } from "../types/Endpoint";
import { FiltroRubro, Rubro, TipoRubro } from "../types/Rubro";
import { findAll } from "../services/BaseService";
import { findRubrosByTipo } from "../services/RubroService";

/**
 * Hook personalizado para obtener una lista de Rubros según un filtro.
 * @param filtro El filtro para la búsqueda de Rubros (opcional).
 * @param tipo El tipo de Rubro para filtrar la búsqueda (opcional).
 * @returns Un objeto que contiene el estado de los Rubros obtenidos.
 */
export const useRubros = (filtro?: FiltroRubro, tipo?: TipoRubro) => {
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getRubros();
    }, [filtro, tipo]);

    const getRubros = async () => {
        const token = await getAccessTokenSilently();
        let newRubros: Rubro[] = [];
    
        switch (filtro) {
            case FiltroRubro.TIPO:
                if (tipo) {
                    newRubros = await findRubrosByTipo(tipo, token);
                }
                break;
            default:
                newRubros = await findAll<Rubro>(Endpoint.Rubro, token);
                break;
        }
    
        setRubros(newRubros);
    };

    return { rubros };
};