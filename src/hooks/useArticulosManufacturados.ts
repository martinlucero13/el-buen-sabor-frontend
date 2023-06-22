import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { findAllArticuloManufacturados, findAllArticuloManufacturadosByTermino } from "../services/ArticuloManufacturadoService";

export function useArticulosManufacturados(termino: string = "all") {
    const [articulosManufacturados, setArticulosManufacturados] = useState<ArticuloManufacturado[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllArticuloManufacturados();
    }, [termino]);

    const getAllArticuloManufacturados = async () => {
        const token = await getAccessTokenSilently();

        if (termino === "all") {
            const newArticulosManufacturados = await findAllArticuloManufacturados(token);
            setArticulosManufacturados(newArticulosManufacturados);
        } else {
            const newArticulosManufacturados = await findAllArticuloManufacturadosByTermino(termino, token);
            setArticulosManufacturados(newArticulosManufacturados);
        }
    }

    return { articulosManufacturados };
}