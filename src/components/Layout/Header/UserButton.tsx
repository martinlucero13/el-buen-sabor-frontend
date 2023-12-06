import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Dropdown } from "react-bootstrap";
import { BagFill, Basket, Bicycle, BoxArrowLeft, Person, PersonCircle, PersonFill, PersonLinesFill, PersonWorkspace, Wallet2 } from "react-bootstrap-icons";

import { RolUsuario } from "../../../types/Rol";
import PermissionAccess from "../../../util/PermissionAccess";
import { useCliente } from "../../../hooks/useCliente";

/**
 *  botón de inicio de sesión/registro si el usuario no está autenticado. Si el usuario está autenticado, muestra un menú desplegable.
 */
function UserButton(): JSX.Element {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const { user } = useAuth0();
    const { cliente } = useCliente(undefined, user?.sub);
    
    const handleLogin = () => {
        loginWithRedirect({
            appState: {
                returnTo: window.location.pathname,
            },
        });
    };

    const handleRegister = () => {
        loginWithRedirect({
            authorizationParams: {
                screen_hint: "signup",
            },
            appState: {
                returnTo: "/registro",
            },
        });
    };

    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    };

    return (
        isAuthenticated ? (
            <Dropdown>
                <Dropdown.Toggle id="dropdown-user-register" variant="dark" className="dropdown-toggle-no-caret">
                    <PersonCircle size={25} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/mi-perfil">
                        <PersonLinesFill className="me-2" />
                        <span>Perfil</span>
                    </Dropdown.Item>

                    <PermissionAccess request={[RolUsuario.CLIENTE]}>
                        <Dropdown.Item as={Link} to={`/mis-pedidos/${cliente.id}`}>
                            <BagFill className="me-2" />
                            <span>Mis Pedidos</span>
                        </Dropdown.Item>
                    </PermissionAccess>

                    <PermissionAccess request={[RolUsuario.ADMIN, RolUsuario.COCINERO, RolUsuario.CAJERO, RolUsuario.DELIVERY]}>
                        <Dropdown.Divider />
                    </PermissionAccess>

                    <PermissionAccess request={[RolUsuario.ADMIN]}>
                        <Dropdown.Item as={Link} to='/admin'>
                            <PersonWorkspace className="me-2" />
                            <span>Administración</span>
                        </Dropdown.Item>
                    </PermissionAccess>

                    <PermissionAccess request={[RolUsuario.ADMIN, RolUsuario.COCINERO]}>
                        <Dropdown.Item as={Link} to='/cocinero/pedidos'>
                            <Basket className="me-2" />
                            <span>Cocina</span>
                        </Dropdown.Item>
                    </PermissionAccess>

                    <PermissionAccess request={[RolUsuario.ADMIN, RolUsuario.CAJERO]}>
                        <Dropdown.Item as={Link} to='/cajero/pedidos'>
                            <Wallet2 className="me-2" />
                            <span>Caja</span>
                        </Dropdown.Item>
                    </PermissionAccess>

                    <PermissionAccess request={[RolUsuario.ADMIN, RolUsuario.DELIVERY]}>
                        <Dropdown.Item as={Link} to='/delivery/pedidos'>
                            <Bicycle className="me-2" />
                            <span>Delivery</span>
                        </Dropdown.Item>
                    </PermissionAccess>

                    <Dropdown.Divider />

                    <Dropdown.Item onClick={handleLogout} className="cerrar-sesion">
                        <BoxArrowLeft className="me-2" />
                        <span>Cerrar Sesión</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        ) : (
            <Dropdown>
                <Dropdown.Toggle id="dropdown-user-no-register" variant="dark" className="dropdown-toggle-no-caret">
                    <PersonCircle size={25} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleRegister()}>
                        <Person className="me-1" />
                        <span>Registrarse</span>
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => handleLogin()}>
                        <PersonFill className="me-1" />
                        <span>Iniciar Sesión</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    );
}

export default UserButton;