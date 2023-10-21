import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Endpoint } from "../types/Endpoint";
import { ArticuloInsumo } from "../types/ArticuloInsumo";
import { findById } from "../services/BaseService";
import { UnidadMedida } from "../types/UnidadMedida";

/**
 * Hook personalizado para obtener un Artículo Insumo por su ID.
 * @param id ID del Artículo Insumo a buscar.
 * @returns Un objeto que contiene el estado del Artículo Insumo.
 */
export const useArticuloInsumo = (id: number) => {
    const [articuloInsumo, setArticuloInsumo] = useState<ArticuloInsumo>({
        id: 0,
        denominacion: '',
        bloqueado: false,
        esInsumo: true,
        precioCompra: 0,
        stockMinimo: 0,
        stockActual: 0,
        unidadMedida: UnidadMedida.GRAMOS,
        rubro: { id: 0, denominacion: '', bloqueado: false, esInsumo: true }
    });
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getArticuloInsumoById();
    }, [id]);

    const getArticuloInsumoById = async () => {
        if (id !== -1) {
            const token = await getAccessTokenSilently();

            const newArticuloInsumo = await findById<ArticuloInsumo>(Endpoint.ArticuloInsumo, id, token);
            setArticuloInsumo(newArticuloInsumo);
        }
    };

    return { articuloInsumo };
};