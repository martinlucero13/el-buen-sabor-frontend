import "./HeaderAdmin.css";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from 'react-bootstrap';

function HeaderAdmin(): JSX.Element {
    return (
        <Nav justify variant="tabs" className="header-admin">
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/usuarios" id="boton-usuario">Usuarios</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <NavDropdown title="Stock" id="stock-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/stock/articuloi">Articulo Insumo</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/stock/articulom">Artículo Manufacutrado</NavDropdown.Item>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/rubros" id="boton-rubro">Rubros</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <NavDropdown title="Estadísticas" id="estadisticas-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/estadistica/clientes">Clientes</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/estadistica/productos">Productos</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/estadistica/monetarios">Monetarios</NavDropdown.Item>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/" id="boton-facturacion">Facturación</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderAdmin;