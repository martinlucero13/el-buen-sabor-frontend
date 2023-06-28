import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./Button.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserButton(): JSX.Element {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const navigateToProfile = () => {
    navigate("/perfil"); 
  };

  return (
    <DropdownButton
      title={user?.name}
      variant="bi bi-person-fill btn btn-light navbar-btn"
    >
      <Dropdown.Item onClick={navigateToProfile}>Perfil</Dropdown.Item>
      <Dropdown.Item>Pedidos</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => handleLogout()} style={{color: "#F94144"}}>Cerrar Sesión</Dropdown.Item>
    </DropdownButton>
  );
}

export default UserButton;