import "./Header.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeaderHome(): JSX.Element {
    return (
        <Nav justify variant="tabs" className="header-home">
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/pizza">Pizzas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/lomo">Lomos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/hamburguesa">Burgers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/bebida">Bebibas</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderHome;