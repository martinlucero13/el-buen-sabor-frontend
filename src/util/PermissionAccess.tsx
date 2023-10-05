import { RolUsuario } from "../types/Rol";
import { usePermission } from "../context/PermissionContext";

interface Props {
    children: React.ReactNode;
    request: RolUsuario[];
}

/**
 * Componente de acceso condicional basado en los permisos del usuario.
 * @param children Elementos secundarios que se renderizarán si el acceso es permitido. 
 * @param request Lista de permisos requeridos para acceder al contenido.
 * @author Lucero 
 */
function PermissionAccess({ children, request }: Props): JSX.Element {
    const { permission } = usePermission();
    const isAccessible = request.includes(permission);

    return(
        <>
            { isAccessible && children }
        </>
    );
}

export default PermissionAccess;