import "./Pefil.css";
import { Link } from "react-router-dom";
import { PersonFill } from "react-bootstrap-icons";
import { Button, Container } from "react-bootstrap";

import { RolUsuario } from "../../../types/Rol";
import PermissionAccess from "../../../util/PermissionAccess";

interface Props {
    cliente: string;
    handleLogout: () => void;
}

/**
 * Componente del panel de perfil.
 */
function Panel({ cliente, handleLogout }: Props): JSX.Element {
    return (
        <Container className="border border-dark d-flex flex-column justify-content-between container-panel">
            <div className="text-center py-3">
                <Button variant="link" className="btn-person-panel">
                    <PersonFill size={50} color="white" />
                </Button>
                <p className="mt-3 text-uppercase">{ cliente }</p>
            </div>
            <Link to="/mi-perfil" className="m-0 p-2 border-top border-white">
                Mis datos personales
            </Link>
            <PermissionAccess request={[RolUsuario.CLIENTE]}>
                <Link to="/mis-pedidos" className="m-0 p-2 border-top border-white">
                    Mis pedidos
                </Link>
            </PermissionAccess>
            <Link to="#" onClick={handleLogout} className="m-0 p-2 border-top border-white">
                Cerrar Sesión
            </Link>
        </Container>
    );
}

export default Panel;