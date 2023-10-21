import "./Header.css";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import ShopCart from "./ShopCart";
import UserButton from "./UserButton";

/**
 * Componente de la barra de navegación superior.
 */
function Header(): JSX.Element {
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="p-3 header-home">
            <Container>
                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li>
                                <Link to="/" className="nav-link tpx-2 text-white fw-semibold">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/productos/all" className="nav-link px-2 text-white fw-semibold">
                                    Productos
                                </Link>
                            </li>
                            <li>
                                <Link to="/informacion/principal" className="nav-link px-2 text-white fw-semibold">
                                    Información
                                </Link>
                            </li>
                            <li>
                                <Link to="/informacion/equipo" className="nav-link px-2 text-white fw-semibold">
                                    Nuestro Equipo
                                </Link>
                            </li>
                        </ul>
                    </Nav>
                </Navbar.Collapse>

                <div className="d-flex">
                    <UserButton />
                    <ShopCart />
                </div>
            </Container>
        </Navbar>
    );
}

export default Header;