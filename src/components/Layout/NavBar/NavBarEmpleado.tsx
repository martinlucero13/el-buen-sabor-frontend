import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../Auth0/LoginButton";
import EmpleadoButton from "../../Auth0/EmpleadoButton";

import "./NavBar.css";
import logo from "../../../assets/logo.png";
import { Container, Nav, Navbar } from "react-bootstrap";

function NavBarEmpleado(): JSX.Element {
  const { isAuthenticated } = useAuth0();

  return (
    <Navbar fixed="top" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <img src={logo} alt="el-buen-sabor" className="navbar-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav navbarScroll>
            {
              isAuthenticated
              ? 
              <EmpleadoButton /> 
              :
              <LoginButton />
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarEmpleado;