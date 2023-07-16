import "./Header.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeaderHome(): JSX.Element {
    return (
        <Nav justify variant="tabs" className="header-home">
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/all" id='boton-pizzas'>Todos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/pizza" id='boton-pizzas'>Pizzas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/lomo" id='boton-lomos'>Lomos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/hamburguesa" id='boton-burgers'>Burgers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/bebida" id='boton-bebidas'>Bebibas</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderHome;