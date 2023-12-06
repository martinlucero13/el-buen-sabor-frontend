import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form, Modal } from "react-bootstrap";

import { useModal } from "../../hooks/useModal";
import { Auth0Clave } from "../../types/Usuario";
import { validationSchemaClave } from "../Usuario/Perfil/SchemaClave";
import { findAuth0RolesByUsuarioId, findLoginsByUsuarioId, updateClaveAuth0Usuario } from "../../services/Auth0Service";

interface Props {
    firstLogin: boolean;
    setFirstLogin: (value: boolean) => void;
}

/**
 * Componente para que el Empleado cambie la contraseña si ingresa por primera vez.
 * Vista de Empleado.
 */
function EmpleadoLogin({ firstLogin, setFirstLogin }: Props): JSX.Element {
    const { showModal, handleClose } = useModal();
    const { user, getAccessTokenSilently } = useAuth0();
    const [auth0clave] = useState<Auth0Clave>({ clave: '', confirmarClave: '' });

    useEffect(() => {
        handleLogin();
    }, [user, firstLogin]);

    const handleLogin = async () => {
        if (firstLogin && user && user.sub !== undefined) {
            const token = await getAccessTokenSilently();

            const logins = await findLoginsByUsuarioId(user.sub, token);

            if (logins === 1) {
                const roles = await findAuth0RolesByUsuarioId(user.sub, token);

                if (roles.at(0)?.name !== "Cliente") {
                    handleClose();
                }
            } else {
                setFirstLogin(false);
            }
        }
    };

    const formik = useFormik({
        initialValues: auth0clave,
        validationSchema: validationSchemaClave(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: Auth0Clave) => handleSubmit(entity)
    });

    const handleSubmit = async (entity: Auth0Clave) => {
        if (user && user.sub !== undefined) {
            const token = await getAccessTokenSilently();

            await updateClaveAuth0Usuario(user.sub, entity.clave, token);

            localStorage.setItem('firstLogin', JSON.stringify(false));
            setFirstLogin(false);
            handleClose();
        }
    };

    return (
        <Modal show={showModal} centered backdrop="static">
            <Modal.Header>
                <Modal.Title>
                    ¡Bienvenido {user?.name} !
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="clave">Nueva Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            id="clave"
                            name="clave"
                            placeholder="Nueva Contraseña"
                            value={formik.values.clave}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.clave && formik.touched.clave)}
                        />
                        <Form.Control.Feedback type="invalid">
                            { formik.errors.clave }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="confirmarClave">Confirmar Nueva Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            id="confirmarClave"
                            name="confirmarClave"
                            placeholder="Confirmar Nueva Contraseña"
                            value={formik.values.confirmarClave}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.confirmarClave && formik.touched.confirmarClave)}
                        />
                        <Form.Control.Feedback type="invalid">
                            { formik.errors.confirmarClave }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Modal.Footer>
                        <Button type="submit" disabled={!formik.isValid} variant="dark" className="btn-ok">
                            Confirmar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EmpleadoLogin;