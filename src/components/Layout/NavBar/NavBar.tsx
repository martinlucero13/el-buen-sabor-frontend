import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import UserButton from "../../Auth0/UserButton";
import LoginButton from "../../Auth0/LoginButton";

import "./NavBar.css";
import logo from "../../../assets/logo.png";
import cart3 from "../../../assets/cart3.svg";
import { Navbar, Nav, Container, Form, Button, InputGroup } from "react-bootstrap";

function NavBar(): JSX.Element {
  const { isAuthenticated } = useAuth0();
  const [search, setSearch] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    handleNavigate();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    setTimeout(handleNavigate, 1000);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.search.value) {
      setSearch(event.currentTarget.search.value);
    }

    handleNavigate();
  };

  const handleNavigate = () => {
    navigate(`/productos/${search}`);
  };

  const handleNavigateCarrito = () => {
    navigate(`/carrito`);
  };

  return (
    <Navbar fixed="top" expand="lg">
      <Container fluid>
        <Nav.Link href="/">
          <img src={logo} alt="el-buen-sabor" className="navbar-logo" />
        </Nav.Link>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Form onSubmit={handleSearch} className="d-flex mx-auto">
            <InputGroup>
              <Form.Control
                name="search"
                type="text"
                placeholder="Buscar productos..."
                onChange={handleChange}
              />
              <Button type="submit" variant="btn btn-light">
                <i className="bi-search"></i>
              </Button>
            </InputGroup>
          </Form>

          <Nav navbarScroll className="my-2 my-lg-0">
            {
              isAuthenticated
                ?
                <UserButton />
                :
                <LoginButton />
            }
            <Nav.Link>
              <img src={cart3} alt="cart3" width="32px" className="link-cart3" onClick={handleNavigateCarrito}/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;