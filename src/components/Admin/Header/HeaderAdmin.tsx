//import "../../../Header.css";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";

/**
 * Componente que muestra el encabezado de la sección del Admin.
 * Vista de Admin.
 */
function HeaderAdmin(): JSX.Element {
    return (
        <Nav justify variant="tabs" className="header-empleado">
            <Nav.Item>
                <NavDropdown title="Usuarios" id="usuarios-dropdown">
                    <Nav.Link as={Link} to="/admin/usuarios/clientes">Clientes</Nav.Link>
                    <Nav.Link as={Link} to="/admin/usuarios/empleados">Empleados</Nav.Link>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item>
                <NavDropdown title="Stock" id="stock-dropdown">
                    <Nav.Link as={Link} to="/admin/stock/productos">Productos</Nav.Link>
                    <Nav.Link as={Link} to="/admin/stock/ingredientes">Ingredientes</Nav.Link>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/rubros">Rubros</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <NavDropdown title="Estadísticas" id="estadisticas-dropdown">
                    <Nav.Link as={Link} to="/admin/estadistica/clientes">Clientes</Nav.Link>
                    <Nav.Link as={Link} to="/admin/estadistica/productos">Productos</Nav.Link>
                    <Nav.Link as={Link} to="/admin/estadistica/monetarios">Monetarios</Nav.Link>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/">Facturación</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderAdmin;