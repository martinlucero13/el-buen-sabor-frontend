import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import { Rol } from "../../../types/Rol";
import { Cliente } from "../../../types/Cliente";
import { Endpoint } from "../../../types/Endpoint";
import { Localidad } from "../../../types/Localidad";
import { Auth0Usuario } from "../../../types/Usuario";
import { useCliente } from "../../../hooks/useCliente";
import { useEntities } from "../../../hooks/useEntities";
import { validationSchemaEmpleado } from "./SchemaEmpleado";
import { save, update } from "../../../services/BaseService";
import { existsUsuarioByEmail } from "../../../services/UsuarioService";
import { asignarAuth0UsuarioARol, deleteRolesFromAuth0Usuario, findAuth0RolesByUsuarioId, saveAuth0Usuario, updateEmailAuth0Usuario } from "../../../services/Auth0Service";
import { toastError, toastExito, toastInfo } from "../../../util/ToastUtil";

interface Props {
    showModal: boolean;
    handleClose: () => void;
    handleReload: () => void;
    empleado?: Cliente;
}

/**
 * Componente para crear/actualizar un Empleado.
 */
function ModalEmpleado({ showModal, handleClose, handleReload, empleado }: Props): JSX.Element {
    const { cliente: values } = useCliente(empleado ? empleado.id : -1);

    let [newAuth0Id] = useState('');
    const prevRolId = useRef(empleado?.usuario.rol.id);
    const [auth0RolId, setAuth0RolId] = useState<string>('');
    const { entities: roles } = useEntities<Rol>(Endpoint.Rol);
    const { entities: localidades } = useEntities<Localidad>(Endpoint.Localidad);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        formik.setValues(values);
    }, [values]);

    const formik = useFormik({
        initialValues: { ...values },
        validationSchema: validationSchemaEmpleado(values.id),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: Cliente) => handleSubmit(entity)
    });

    const handleSubmit = async (entity: Cliente) => {
        const token = await getAccessTokenSilently();

        if (entity.id === 0) {
            const exists = await existsUsuarioByEmail(entity.usuario.email, token);

            if (!exists) {
                newAuth0Id = await handleAuht0(true, entity, token) || '';
                const newEntity = await handleAuth0Id(entity);
                await save<Cliente>(Endpoint.Cliente, newEntity, token);
                handlePostUserRegistration(newEntity, token);
                
                toastExito(`El Empleado se guardó exitosamente.`);
                handleResetFormik();
                handleReset();
            } else {
                toastError(`No se pudo guardar el Empleado. El email "${entity.usuario.email}" ya está en uso.`);
            }
        } else {
            await handleAuht0(false, entity, token);
            const newValues = await update<Cliente>(Endpoint.Cliente, entity.id, entity, token);
            
            toastExito(`El Empleado se actualizó exitosamente.`);
            handleResetFormik(newValues);
            handleReset();
        }
    };

    const handleAuht0 = async (isNew: boolean, entity: Cliente, token: string) => {
        if (isNew) {
            const auth0Usuario: Auth0Usuario = {
                email: entity.usuario.email,
                clave: entity.usuario.clave,
                bloqueado: entity.usuario.bloqueado
            };

            const auth0Id = await saveAuth0Usuario(auth0Usuario, token);

            return auth0Id;
        } else {
            const auth0Id = entity.usuario.auth0Id;

            if (prevRolId.current !== entity.usuario.rol.id) {
                const auth0Roles = await findAuth0RolesByUsuarioId(auth0Id, token); 

                if (auth0Roles.length > 0) {
                    await deleteRolesFromAuth0Usuario(auth0Id, auth0Roles, token);
                }

                await asignarAuth0UsuarioARol(auth0Id, auth0RolId, token);
            }

            if (empleado?.usuario.email !== entity.usuario.email) {
                await updateEmailAuth0Usuario(auth0Id, entity.usuario.email, token);
            }
        }
    };

    const handleAuth0Id = async (entity: Cliente): Promise<Cliente> => {
        return {
            ...entity,
            usuario: {
                ...entity.usuario,
                auth0Id: newAuth0Id
            }
        }
    };

    const handlePostUserRegistration = async (entity: Cliente, token: string) => {
        const auth0Id = entity.usuario.auth0Id;

        const auth0Roles = await findAuth0RolesByUsuarioId(auth0Id, token); 

        if (auth0Roles.length > 0) {
            await deleteRolesFromAuth0Usuario(auth0Id, auth0Roles, token);
        }

        await asignarAuth0UsuarioARol(auth0Id, auth0RolId, token);
    };

    const handleReset = () => {
        handleReload();
        handleClose();
    };

    const handleResetFormik = (newValues?: Cliente) => {
        newValues ? formik.resetForm({ values }) : formik.resetForm();
    };

    return(
        <Modal show={showModal} onHide={handleClose} centered backdrop="static" className="modal-xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    { empleado ? 'Editar' : 'Nuevo' } Empleado
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="nombre">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.nombre }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="apellido">Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    placeholder="Apellido"
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.apellido }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="telefono">Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    placeholder="Teléfono"
                                    value={formik.values.telefono}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.telefono }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    id="email"
                                    name="usuario.email"
                                    placeholder="Email"
                                    value={formik.values.usuario.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.usuario?.email && formik.touched.usuario?.email)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.usuario?.email }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="calle">Calle</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="calle"
                                    name="domicilio.calle"
                                    placeholder="Calle"
                                    value={formik.values.domicilio.calle}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.domicilio?.calle && formik.touched.domicilio?.calle)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.domicilio?.calle }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="numero">Número</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="numero"
                                    name="domicilio.numero"
                                    placeholder="Número"
                                    value={formik.values.domicilio.numero}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.domicilio?.numero && formik.touched.domicilio?.numero)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.domicilio?.numero }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3">
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
                                        formik.setFieldValue('domicilio.localidad', values.domicilio.localidad);
                                    }
                                }}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.domicilio?.localidad?.nombre && formik.touched.domicilio?.localidad)}
                            >
                                <option value=""></option>
                                {
                                    localidades.map((item: Localidad) =>
                                        <option value={JSON.stringify(item)} key={item.id}>
                                            { item.nombre }
                                        </option>
                                    )
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                { formik.errors.domicilio?.localidad?.nombre }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="rol">Rol</Form.Label>
                            <Form.Select
                                id="rol"
                                name="usuario.rol"
                                value={JSON.stringify(formik.values.usuario.rol) || ''}
                                onChange={e => {
                                    try {
                                        const selectedRol = JSON.parse(e.target.value);
                                        formik.setFieldValue('usuario.rol', selectedRol);
                                        setAuth0RolId(selectedRol.auth0RolId);
                                    } catch (error) {
                                        formik.setFieldError('usuario.rol', 'La Localidad es requerida');
                                        formik.setFieldValue('usuario.rol', values.usuario.rol);
                                    }
                                }}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.usuario?.rol?.denominacion && formik.touched.usuario?.rol)}
                            >
                                <option value=""></option>
                                {
                                    roles.filter((item: Rol) => item.id !== 5).map((item: Rol) =>
                                        <option value={JSON.stringify(item)} key={item.id}>
                                            { item.denominacion }
                                        </option>
                                    )
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                { formik.errors.usuario?.rol?.denominacion }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    { values.id === 0 &&
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="clave">Contraseña Provisoria</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="clave"
                                        name="usuario.clave"
                                        placeholder="Contraseña Provisoria"
                                        value={formik.values.usuario.clave}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.usuario?.clave && formik.touched.usuario?.clave)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.usuario?.clave }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="confirmarClave">Confirmar Contraseña Provisoria</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="confirmarClave"
                                        name="usuario.confirmarClave"
                                        placeholder="Confirmar Contraseña Provisoria"
                                        value={formik.values.usuario.confirmarClave}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.usuario?.confirmarClave && formik.touched.usuario?.confirmarClave)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.usuario?.confirmarClave }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    }

                    <Modal.Footer>
                        <Button onClick={handleClose} variant="dark" className="btn-cancel">
                            Cerrar
                        </Button>

                        <Button type="submit" disabled={!formik.isValid} variant="dark" className="btn-ok">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalEmpleado;