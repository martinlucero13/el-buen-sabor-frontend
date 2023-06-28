import { Button, Col, Container, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import "./DatosPerfil.css";
import avatar from "../../../assets/avatar.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';


export const DatosPerfil = () =>{
    const { logout } = useAuth0();
    const [showPersonalData, setShowPersonalData] = useState(true);

    const handleToggleContent = () => {
        setShowPersonalData(!showPersonalData);
    };

    
    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };
    
    return(
        <>
            <Container fluid="md" className="mt-3">
                <div className="d-flex">
                <div className="orange-rectangle">
                    <div className="orange-rectangle-inner">
                    <div className="div-foto">
                        <a><img src={avatar} width="320px" alt="avatar" /></a>
                        <div>Nombre Usuario</div>
                    </div>
                    <Button className={`rectangle-datos ${showPersonalData ? 'rectangle-disabled' : ''}`} disabled={showPersonalData} onClick={handleToggleContent}>Mis datos Personales</Button>
                    <Button className={`rectangle-pedidos  ${!showPersonalData ? 'rectangle-disabled' : ''}`} disabled={!showPersonalData} onClick={handleToggleContent}>Mis Pedidos</Button>
                    <Button className="rectangle-cerrar" onClick={() => handleLogout()}>Cerrar Sesión</Button>
                    </div>
                </div>
                {showPersonalData ? (
                <>
                    <div className="data-informacion">
                        <div className="content">
                            <Row>
                            <Col className="font-titulos-datos-perfil">
                                <strong>Datos Personales</strong>
                            </Col>
                            </Row>
                            <div className="contenedor-blanco-data">
                            <Row>
                                <Col>
                                <label className="font-labels-datos-perfil">Nombre</label>
                                <Form.Control
                                    className="font-info-datos-perfil"
                                    type="text"
                                    name="nombre"
                                />
                                </Col>
                                <Col>
                                <label className="font-labels-datos-perfil">Apellido</label>
                                <Form.Control
                                    className="font-info-datos-perfil"
                                    type="text"
                                    name="apellido"
                                />
                                </Col>
                                <Col>
                                <label className="font-labels-datos-perfil">Dirección</label>
                                <Form.Control
                                    className="font-info-datos-perfil"
                                    type="text"
                                    name="direccion"
                                />
                                </Col>
                                <Col>
                                <label className="font-labels-datos-perfil">Departamento</label>
                                <Form.Control
                                    className="font-info-datos-perfil"
                                    type="text"
                                    name="departamento"
                                />
                                </Col>
                                <Col>
                                <label className="font-labels-datos-perfil">Email</label>
                                <Form.Control
                                    className="font-info-datos-perfil"
                                    type="email"
                                    name="email"
                                    placeholder="Ingrese su correo electrónico"
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, ingrese un correo electrónico válido.
                                </Form.Control.Feedback>
                                </Col>
                                <Col>
                                <label className="font-labels-datos-perfil">Teléfono</label>
                                <Form.Control
                                    className="font-info-datos-perfil"
                                    type="tel"
                                    name="telefono"
                                    placeholder="Ingrese su número de teléfono"
                                    pattern="[0-9]{10}"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, ingrese un número de teléfono válido (10 dígitos numéricos).
                                </Form.Control.Feedback>
                                </Col>
                            </Row>
                            </div>
                            <Button variant="dark" className="button-data-perfil">
                            Guardar Cambios
                            </Button>
                        </div>
                    </div>
                    <div className="data-informacion">
                        <div className="content">
                            <Row>
                                <Col className="font-titulos-datos-perfil">
                                    <strong>Cambio de Contraseña</strong>
                                </Col>
                            </Row>
                            <div className="contenedor-blanco-data">
                            <Row>
                                <Col>
                                <label className="font-labels-datos-perfil">Contraseña Actual</label>
                                <Form.Control
                                    className="font-info-datos-perfil"
                                    type="password"
                                    name="contrasena-actual"
                                />
                                </Col>
                                <Col>
                                <label className="font-labels-datos-perfil">Nueva Contraseña</label>
                                <Form.Control
                                    className="font-info-datos-perfil"
                                    type="password"
                                    name="nueva-contrasena"
                                />
                                </Col>
                                <Col>
                                <label className="font-labels-datos-perfil">Confirmar Nueva Contraseña</label>
                                <Form.Control
                                    className="font-info-datos-perfil"
                                    type="password"
                                    name="confirmar-contrasena"
                                />
                                </Col>
                            </Row>
                        </div>
                        <Button variant="dark" className="button-data-perfil">
                            Cambiar Contraseña
                        </Button>
                    </div>
                </div>
                </>
                ) : (
                <div className="data-informacion">
                    <div className="content">
                        <Row>
                            <Col className="font-titulos-datos-perfil">
                                <strong>Mis Pedidos</strong>
                            </Col>
                        </Row>
                        
                    </div>
                </div>
                )}
                </div>
            </Container>
        </>
    );
}