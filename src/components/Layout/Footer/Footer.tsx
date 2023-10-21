import "./Footer.css";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Instagram, Facebook, Whatsapp } from "react-bootstrap-icons";

import { toastInfo } from "../../../util/ToastUtil";

/**
 * Componente que muestra el pie de página de la aplicación.
 */
function Footer(): JSX.Element {
    const [copied, setCopied] = useState(false);

    const phoneToCopy = useRef<HTMLSpanElement | null>(null);
    const emailToCopy = useRef<HTMLSpanElement | null>(null);

    const copyText = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);

        toastInfo('Copiado', 1000);
    };

    return (
        <footer className="w-100 mt-auto py-5 bg-dark text-white footer">
            <Container>
                <Row className="row-cols-1 row-cols-sm-2 row-cols-md-5">
                    <Col className="mb-3">
                        <Image src="/images/logo.png" alt="el-buen-sabor" width="180px" />
                    </Col>
                    <Col className="mb-3"></Col>
                    <Col className="mb-3">
                        <h5 className="fw-semibold">Explorar</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <Link to="/" className="nav-link">
                                    Inicio
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="/productos/all" className="nav-link">
                                    Menú
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="/informacion/opiniones" className="nav-link">
                                    Opiniones
                                </Link>
                            </li>
                        </ul>
                    </Col>
                    <Col className="mb-3">
                        <h5 className="fw-semibold">Contacto</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <Link to="/informacion/ubicacion" className="nav-link">
                                    Ubicación
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <span ref={phoneToCopy} className="copyable-text" onClick={() => copyText('+54 9 261 579-3806')}>
                                +54 9 261 579-3806
                                </span>
                            </li>
                            <li className="nav-item mb-2">
                                <span ref={emailToCopy} className="copyable-text" onClick={() => copyText('elbuen_sabor@gmail.com')}>
                                elbuen_sabor@gmail.com
                                </span>
                            </li>
                        </ul>
                    </Col>
                    <Col className="mb-3">
                        <h5 className="fw-semibold">Información legal</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <Link to="/informacion/politica-privacidad" className="nav-link">
                                    Política de privacidad
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="/informacion/terminos-condiciones" className="nav-link">
                                    Términos y condiciones
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top border-light">
                    <p>© 2023 Barca SC, Inc. </p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3">
                            <a href="https://www.whatsapp.com/?lang=es_LA" target="_blank">
                                <Whatsapp size={26} color="white" />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a href="https://es-la.facebook.com/" target="_blank">
                                <Facebook size={26} color="white" />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a href="https://www.instagram.com/" target="_blank">
                                <Instagram size={26} color="white" />
                            </a>
                        </li>
                    </ul>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;