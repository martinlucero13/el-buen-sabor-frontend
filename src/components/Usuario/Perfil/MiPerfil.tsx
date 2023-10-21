import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PersonFillGear } from "react-bootstrap-icons";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { Cliente } from "../../../types/Cliente";
import { Endpoint } from "../../../types/Endpoint";
import { Auth0Clave } from "../../../types/Usuario";
import { Localidad } from "../../../types/Localidad";
import { useModal } from "../../../hooks/useModal";
import { useEntities } from "../../../hooks/useEntities";
import { update } from "../../../services/BaseService";
import { updateClaveAuth0Usuario, updateEmailAuth0Usuario } from "../../../services/Auth0Service";
import { validationSchemaClave } from "./SchemaClave";
import { validationSchemaCliente } from "../../Admin/Clientes/SchemaCliente";
import { toastExito, toastInfo } from "../../../util/ToastUtil";

interface Props {
    cliente: Cliente;
}

/**
 * Componente para ver/editar el perfil.
 */
function MiPerfil({ cliente }: Props): JSX.Element {
    const { logout, getAccessTokenSilently } = useAuth0();
    const { showModal: showForm, handleClose } = useModal();

    const [auth0clave] = useState<Auth0Clave>({ clave: '', confirmarClave: '' });
    const { entities: localidades } = useEntities<Localidad>(Endpoint.Localidad);

    useEffect(() => {
        formik.setValues(cliente);
    }, [cliente])

    const formik = useFormik({
        initialValues: cliente,
        validationSchema: validationSchemaCliente(cliente.id),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: Cliente) => handleSubmit(entity)
    });

    const formikClave = useFormik({
        initialValues: auth0clave,
        validationSchema: validationSchemaClave(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: Auth0Clave) => handleSubmitClave(entity)
    });

    const handleSubmit = async (entity: Cliente) => {
        const token = await getAccessTokenSilently();

        await handleAuth0(entity, token);
        await update<Cliente>(Endpoint.Cliente, entity.id, entity, token);

        handleClose();
        toastExito('Sus datos se han actualizado exitosamente.');

        if (cliente.usuario.email !== entity.usuario.email) {
            setTimeout(() => {
                handleLogout();
            }, 5500);
        }
    };

    const handleSubmitClave = async (entity: Auth0Clave) => {
        const token = await getAccessTokenSilently();

        await updateClaveAuth0Usuario(cliente.usuario.auth0Id, entity.clave, token);

        handleClose();
    };

    const handleAuth0 = async (entity: Cliente, token: string) => {
        if (cliente.usuario.email !== entity.usuario.email) {
            await updateEmailAuth0Usuario(entity.usuario.auth0Id, entity.usuario.email, token);
            toastInfo('Hemos enviado un mensaje a tu nuevo email con un enlace de verificación. Se cerrará la sesión por motivos de seguridad.');
        }
    };

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    const handleCancel = () => {
        formik.setValues(cliente);
        handleClose();
    };

    const handleCancelClave = () => {
        formikClave.setValues(auth0clave);
        handleClose();
    };

    return (
        <Container>
            <Row>
                <h1>Mi Perfil</h1>
            </Row>
            <Row>
                <Col>
                    <h2>Datos personales</h2>
                </Col>
                <Col>
                    {
                        !showForm
                            ?
                            <Button onClick={handleClose} variant="dark">
                                <PersonFillGear size={20} />
                            </Button>
                            :
                            <h2>
                                Cambio contraseña
                            </h2>
                    }
                </Col>
            </Row>

            <Row>
                <Col>
                    {/* FORMULARIO DATOS PERSONALES */}
                    <Form onSubmit={formik.handleSubmit} className="mis-datos-form">
                        <Form.Group className="mb-2">
                            <Form.Label htmlFor="nombre">Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                                disabled={!showForm}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.nombre}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label htmlFor="apellido">Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
                                disabled={!showForm}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.apellido}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label htmlFor="telefono">Teléfono</Form.Label>
                            <Form.Control
                                type="number"
                                id="telefono"
                                name="telefono"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
                                disabled={!showForm}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.telefono}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                name="usuario.email"
                                value={formik.values.usuario.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.usuario?.email && formik.touched.usuario?.email)}
                                disabled={!showForm}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.usuario?.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label htmlFor="calle">Calle</Form.Label>
                            <Form.Control
                                type="text"
                                id="calle"
                                name="domicilio.calle"
                                value={formik.values.domicilio.calle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.domicilio?.calle && formik.touched.domicilio?.calle)}
                                disabled={!showForm}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.domicilio?.calle}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label htmlFor="numero">Número</Form.Label>
                            <Form.Control
                                type="number"
                                id="numero"
                                name="domicilio.numero"
                                value={formik.values.domicilio.numero}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.domicilio?.numero && formik.touched.domicilio?.numero)}
                                disabled={!showForm}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.domicilio?.numero}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label htmlFor="localidad">Localidad</Form.Label>
                            <Form.Select
                                id="localidad"
                                name="domicilio.localidad"
                                value={JSON.stringify(formik.values.domicilio.localidad) || ''}
                                onChange={e => {
                                    try {
                                        formik.setFieldValue('domicilio.localidad', JSON.parse(e.target.value));
                                    } catch (error) {
                                        formik.setFieldError('domicilio.localidad.nombre', 'La Localidad es requerida');
                                        formik.setFieldValue('domicilio.localidad', '');
                                    }
                                }}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.domicilio?.localidad?.nombre && formik.touched.domicilio?.localidad)}
                                disabled={!showForm}
                            >
                                <option value=""></option>
                                {
                                    localidades.map((item: Localidad) =>
                                        <option value={JSON.stringify(item)} key={item.id}>
                                            {item.nombre}
                                        </option>
                                    )
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.domicilio?.localidad?.nombre}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {showForm && (
                            <div className="container-btn-form">
                                <Button onClick={handleCancel} variant="dark" className="btn-cancel">
                                    Cancelar
                                </Button>

                                <Button type="submit" disabled={!formik.isValid} variant="dark" className="btn-ok">
                                    Guardar cambios
                                </Button>
                            </div>
                        )}
                    </Form>
                </Col>

                <Col>
                    {/* FORMULARIO CONTRASEÑA */}
                    {showForm && (
                        <Form onSubmit={formikClave.handleSubmit}>
                            <Form.Group className="mb-2">
                                <Form.Label htmlFor="clave">Nueva contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="clave"
                                    name="clave"
                                    value={formikClave.values.clave}
                                    onChange={formikClave.handleChange}
                                    onBlur={formikClave.handleBlur}
                                    isInvalid={Boolean(formikClave.errors.clave && formikClave.touched.clave)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formikClave.errors.clave}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label htmlFor="confirmarClave">Confirmar Nueva contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="confirmarClave"
                                    name="confirmarClave"
                                    value={formikClave.values.confirmarClave}
                                    onChange={formikClave.handleChange}
                                    onBlur={formikClave.handleBlur}
                                    isInvalid={Boolean(formikClave.errors.confirmarClave && formikClave.touched.confirmarClave)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formikClave.errors.confirmarClave}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="container-btn-form">
                                <Button onClick={handleCancelClave} variant="dark" className="btn-cancel">
                                    Cancelar
                                </Button>

                                <Button type="submit" variant="dark" className="btn-add" disabled={!formikClave.isValid}>
                                    Cambiar contraseña
                                </Button>
                            </div>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container >
    );
}

export default MiPerfil;