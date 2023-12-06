//import "../../../Header.css";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * Componente que muestra el encabezado de la sección del Cocinero.
 * Vista de Cocinero.
 */
function HeaderCocinero(): JSX.Element {
    return(
        <Nav justify variant="tabs" className="header-empleado">
            <Nav.Item>
                <Nav.Link as={Link} to="/cocinero/pedidos">Pedidos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <NavDropdown title="Stock" id="stock-dropdown">
                    <Nav.Link as={Link} to="/cocinero/stock/productos">Productos</Nav.Link>
                    <Nav.Link as={Link} to="/cocinero/stock/ingredientes">Ingredientes</Nav.Link>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/cocinero/rubros">Rubros</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderCocinero;