import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Cliente, TipoCliente } from "../types/Cliente";
import { findAllClientes, findAllEmpleados } from "../services/ClienteService";

/**
 * Hook personalizado para obtener una lista de Clientes según su tipo.
 * @param tipoCliente Tipo de Cliente a buscar (Cliente/Empleado).
 * @returns Un objeto que contiene el estado de los clientes.
 */
export const useClientes = (tipoCliente: TipoCliente, reload?: boolean) => {
    const [entities, setEntities] = useState<Cliente[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getClientes();
    }, [reload]);

    const getClientes = async () => {
        const token = await getAccessTokenSilently();

        if (tipoCliente === TipoCliente.Cliente) {
            const newClientes = await findAllClientes(token);
            setEntities(newClientes);
        } else {
            const newClientes = await findAllEmpleados(token);
            setEntities(newClientes);
        }
    };

    return { entities };
};