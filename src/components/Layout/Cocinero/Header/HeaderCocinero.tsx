import "./HeaderCocinero.css";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeaderCocinero(): JSX.Element {
    return(
        <Nav justify variant="tabs" className="header-cocinero">
            <Nav.Item>
                <Nav.Link as={Link} to="/cocinero/pedidos" id="boton-pedido">Pedidos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <NavDropdown title="Stock" id="stock-dropdown">
                    <Nav.Link as={Link} to="/cocinero/stock/articuloi">Articulo Insumo</Nav.Link>
                    <Nav.Link as={Link} to="/cocinero/stock/articulom">Artículo Manufacturado</Nav.Link>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/cocinero/rubros" id="boton-rubro">Rubros</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderCocinero;