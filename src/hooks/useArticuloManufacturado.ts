import { useEffect, useState } from "react";

import { Endpoint } from "../types/Endpoint";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { findById } from "../services/BaseService";
import { findSimpleArticuloManufacturadoById } from "../services/ArticuloManufacturadoService";

/**
 * Hook personalizado para obtener un Artículo Manufacturado por su ID.
 * @param id ID del Artículo Manufacturado a buscar.
 * @returns Un objeto que contiene el estado del Artículo Manufacturado y la función para actualizarla.
 */
export const useArticuloManufacturado = (id: number, isSimple?: boolean) => {
    const [articuloManufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>({
        id: 0,
        denominacion: '',
        descripcion: '',
        categoria: '',
        bloqueado: false,
        precioVenta: 0,
        imagen: '',
        imagenURL: '',
        stock: 0,
        receta: '',
        tiempoEstimadoCocina: '',
        rubro: { id: 0, denominacion: '', bloqueado: false, esInsumo: false },
        detalles: []
    });

    useEffect(() => {
        getArticuloManufacturadoById();
    }, [id]);

    const getArticuloManufacturadoById = async () => {
        if (id !== -1) {
            if (isSimple) {
                const newArticuloManufacturado = await findSimpleArticuloManufacturadoById(id);
                setArticuloManufacturado(newArticuloManufacturado);
            } else {
                const newArticuloManufacturado = await findById<ArticuloManufacturado>(Endpoint.ArticuloManufacturado, id);
                setArticuloManufacturado(newArticuloManufacturado);
            }
        }
    };

    return { articuloManufacturado };
};