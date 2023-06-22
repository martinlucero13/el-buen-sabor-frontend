import "./HeaderAdmin.css";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from 'react-bootstrap';

function HeaderAdmin(): JSX.Element {
    return (
        <Nav justify variant="tabs" className="header-admin">
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/usuarios">Usuarios</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <NavDropdown title="Stock" id="stock-dropdown">
                    <Nav.Link as={Link} to="/admin/stock/articuloi">Articulo Insumo</Nav.Link>
                    <Nav.Link as={Link} to="/admin/stock/articulom">Artículo Manufacutrado</Nav.Link>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/rubros">Rubros</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <NavDropdown title="Estadísticas" id="estadisticas-dropdown">
                    <Nav.Link as={Link} to="/admin/">Clientes</Nav.Link>
                    <Nav.Link as={Link} to="/admin/">Productos</Nav.Link>
                    <Nav.Link as={Link} to="/admin/">Monetarios</Nav.Link>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/">Facturación</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderAdmin;