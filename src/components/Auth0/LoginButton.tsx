import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./Button.css";
import { Button } from "react-bootstrap";

function LoginButton(): JSX.Element {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button onClick={() => loginWithRedirect() } variant="btn btn-light navbar-btn">
      <i className="bi bi-person"></i>
      <span>Ingresa</span>
    </Button>
  );
}

export default LoginButton;