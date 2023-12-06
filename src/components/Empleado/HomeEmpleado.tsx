import "./Empleado.css";
import { useAuthorization } from "../../hooks/useAuthorization";

interface Props {
    permission: string;
}

/**
 * Componente que representa la página de inicio del Empleado.
 */
function HomeEmpleado({ permission }: Props): JSX.Element {
    const { isAuthorized } = useAuthorization(permission);

    return (
        <>
            {
                isAuthorized &&
                <div className="d-flex align-items-center justify-content-center container-empleado">
                    <h1 className="text-center text-uppercase title-bienvenida">
                        Bienvenido!
                    </h1>
                </div>
            }
        </>
    );
}

export default HomeEmpleado;