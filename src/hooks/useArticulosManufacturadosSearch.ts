import { useEffect, useRef, useState } from "react";

import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { findAllActivosArticuloManufacturado, findAllArticuloManufacturadoByTermino } from "../services/ArticuloManufacturadoService";

/**
 * Hook personalizado para obtener la lista de Artículos Manufacturados (Simple).
 * @param termino Término de búsqueda opcional.
 * @returns Un objeto que contiene la lista de Artículos Manufacturados.
 */
export const useArticulosManufacturadosSearch = (termino: string = "all") => {
    const [articulosManufacturados, setArticulosManufacturados] = useState<ArticuloManufacturado[]>([]);
    const previousTerminoRef = useRef<string>();

    useEffect(() => {
        if (previousTerminoRef.current !== termino) {
            previousTerminoRef.current = termino;
            getAllArticuloManufacturados(termino);
        }
    }, [termino]);

    const getAllArticuloManufacturados = async (termino: string) => {
        let newArticulosManufacturados: ArticuloManufacturado[];

        if (termino === 'all') {
            newArticulosManufacturados = await findAllActivosArticuloManufacturado();
        } else {
            newArticulosManufacturados = await findAllArticuloManufacturadoByTermino(termino);
        }

        setArticulosManufacturados(newArticulosManufacturados);
    };

    return { articulosManufacturados };
}