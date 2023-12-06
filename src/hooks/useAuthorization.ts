import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { findIsAuthorized } from "../services/RoutesService";


/**
 * Hook personalizado para verificar si el usuario tiene el permiso especificado.
 * @param permission Permiso que se desea verificar para el usuario.
 * @returns Un objeto con la propiedad "isAuthorized" que indica si el usuario tiene el permiso especificado.
 */
export const useAuthorization = (permission: string) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getIsAuthorized();
    }, [permission]);

    const getIsAuthorized = async () => {
        const token = await getAccessTokenSilently();

        const isAuthorized = await findIsAuthorized(permission, token);
        setIsAuthorized(isAuthorized);
    };

    return { isAuthorized };
};