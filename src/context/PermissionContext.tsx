import jwt_decode from "jwt-decode";
import { RolUsuario } from "../types/Rol"
import { useAuth0 } from "@auth0/auth0-react";
const API_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE as string;
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * Componente PermissionProvider y hook personalizado usePermission para manejar los permisos de usuario.
 * El PermissionProvider es un componente de contexto que proporciona el estado de permiso y la función para obtener los permisos del usuario.
 * El hook usePermission se utiliza para acceder a los datos de permiso proporcionados por el PermissionProvider.
 */

interface PermissionContextProps {
    permission: RolUsuario;
    getPermission: () => Promise<void>;
}

interface PermissionsType {
    permissions: string[];
    [key: string]: any;
}

interface PermissionProviderProps {
    children: React.ReactNode;
}

const PermissionContext = createContext<PermissionContextProps | undefined>(undefined);

export const usePermission = (): PermissionContextProps => {
    const context = useContext(PermissionContext);

    if (context === undefined) {
        throw new Error('Error! PermissionContext');
    }

    return context;
};

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
    const [permission, setPermission] = useState<RolUsuario>(RolUsuario.CLIENTE);
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const getPermission = useCallback(async () => {
        if (isAuthenticated) {
            const token = await getAccessTokenSilently();

            const decoded = jwt_decode<PermissionsType>(token);
            const permissions = decoded[`${API_AUDIENCE}/roles`] as string[];
            setPermission(switchPermission(permissions));
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    useEffect(() => {
        getPermission();
    }, [getPermission]);

    const value = useMemo(() => ({ permission, getPermission }), [permission, getPermission]);

    return (
        <PermissionContext.Provider value={value}>
            {children}
        </PermissionContext.Provider>
    );
};

const switchPermission = (permissions: string[]): RolUsuario => {
    switch (true) {
        case permissions.includes(RolUsuario.ADMIN):
            return RolUsuario.ADMIN;
        case permissions.includes(RolUsuario.COCINERO):
            return RolUsuario.COCINERO;
        case permissions.includes(RolUsuario.CAJERO):
            return RolUsuario.CAJERO;
        case permissions.includes(RolUsuario.DELIVERY):
            return RolUsuario.DELIVERY;
        case permissions.includes(RolUsuario.CLIENTE):
            return RolUsuario.CLIENTE;
        default:
            return RolUsuario.CLIENTE;
    }
}