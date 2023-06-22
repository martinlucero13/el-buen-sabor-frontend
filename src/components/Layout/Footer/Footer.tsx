import React from "react";

import "./Footer.css";
import whatsapp from "../../../assets/whatsapp.svg";
import facebook from "../../../assets/facebook.svg";
import instagram from "../../../assets/instagram.svg";
import { Container } from "react-bootstrap";

function Footer(): JSX.Element {
  return (
    <Container className="container-footer fixed-bottom">
      <footer className="d-flex flex-wrap justify-content-between py-3">
        <div className="col-md-4 d-flex">
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2023 EL BUEN SABOR, SA
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://www.whatsapp.com/?lang=es"
              target="_blank"
            >
              <img src={whatsapp} alt="whatsapp" width="32px" />
            </a>
          </li>

          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://es-la.facebook.com/"
              target="_blank"
            >
              <img src={facebook} alt="facebook" width="32px" />
            </a>
          </li>

          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://www.instagram.com/"
              target="_blank"
            >
              <img src={instagram} alt="instagram" width="32px" />
            </a>
          </li>
        </ul>
      </footer>
    </Container>
  );
}

export default Footer;
