import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Cliente } from "../types/Cliente";
import { Endpoint } from "../types/Endpoint";
import { findById } from "../services/BaseService";
import { findClienteByUsuarioAuth0Id } from "../services/ClienteService";

/**
 * Hook personalizado para obtener un Cliente por su ID o auth0Id.
 * @param id ID del Cliente a buscar.
 * @param auth0Id auth0Id del Cliente a buscar.
 * @returns Un objeto que contiene el estado del Cliente.
 */
export const useCliente = (id?: number, auth0Id?: string) => {
    const { getAccessTokenSilently } = useAuth0();
    const [cliente, setCliente] = useState<Cliente>({
        id: 0,
        nombre: '',
        apellido: '',
        telefono: 0,
        usuario: {
            id: 0,
            auth0Id: '',
            email: '',
            bloqueado: false,
            clave: '',
            confirmarClave: '',
            rol: { id: 0, auth0RolId: '', denominacion: '' }
        },
        domicilio: {
            id: 0,
            calle: '',
            numero: 0,
            localidad: { id: 0, nombre: '' }
        }
    });

    useEffect(() => {
        if (auth0Id) {
            getClienteByAuth0Id(auth0Id);
        }
    }, [id, auth0Id]);

    const getClienteByAuth0Id = async (auth0Id: string) => {
        const token = await getAccessTokenSilently();

        if (auth0Id) {
            const newCliente = await findClienteByUsuarioAuth0Id(auth0Id, token);
            setCliente(newCliente);
        } else if (id && id !== -1) {
            const newCliente = await findById<Cliente>(Endpoint.Pedidos, id, token);
            setCliente(newCliente);
        }
    };

    return { cliente };
};