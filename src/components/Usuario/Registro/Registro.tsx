import { useEffect } from "react";
import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

import { Cliente } from "../../../types/Cliente";
import { Endpoint } from "../../../types/Endpoint";
import { Localidad } from "../../../types/Localidad";
import { save } from "../../../services/BaseService";
import { useCliente } from "../../../hooks/useCliente";
import { useEntities } from "../../../hooks/useEntities";
import { validationSchemaCliente } from "../../Admin/Clientes/SchemaCliente";
import { toastExito } from "../../../util/ToastUtil";

/**
 * completar los datos del Cliente después de que se haya registrado utilizando Auth0.
 */
function Registro(): JSX.Element {
    const navigate = useNavigate();
    const { cliente } = useCliente();
    const { user, getAccessTokenSilently } = useAuth0();
    const { entities: localidades } = useEntities<Localidad>(Endpoint.Localidad);

    useEffect(() => {
        getInitialValues();
        formik.setValues(cliente);
    }, []);

    const getInitialValues = () => {
        if (user && user.sub !== undefined) {
            cliente.usuario.email = user.email || '';
            cliente.usuario.auth0Id = user.sub;
            cliente.usuario.rol.id = 5;
        }
    };

    const formik = useFormik({
        initialValues: cliente,
        validationSchema: validationSchemaCliente(1),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: Cliente) => handleSubmit(entity)
    });

    const handleSubmit = async (entity: Cliente) => {
        const token = await getAccessTokenSilently();

        await save<Cliente>(Endpoint.Cliente, entity, token);

        toastExito('Sus datos se han guardado exitosamente.');
        navigate("/")
    };

    return (
        <section>
            <Container className="container-amb py-3">
                <h1 className="text-center">
                    Registro
                </h1>

                <Container>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="nombre">Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.nombre}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="apellido">Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.apellido}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="telefono">Teléfono</Form.Label>
                            <Form.Control
                                type="number"
                                id="telefono"
                                name="telefono"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.telefono}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                name="usuario.email"
                                value={formik.values.usuario.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.usuario?.email && formik.touched.usuario?.email)}
                                disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.usuario?.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="calle">Calle</Form.Label>
                            <Form.Control
                                type="text"
                                id="calle"
                                name="domicilio.calle"
                                value={formik.values.domicilio.calle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.domicilio?.calle && formik.touched.domicilio?.calle)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.domicilio?.calle}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="numero">Número</Form.Label>
                            <Form.Control
                                type="number"
                                id="numero"
                                name="domicilio.numero"
                                value={formik.values.domicilio.numero}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.domicilio?.numero && formik.touched.domicilio?.numero)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.domicilio?.numero}
                            </Form.Control.Feedback>
                        </Form.Group>

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
                                        formik.setFieldValue('domicilio.localidad', cliente.domicilio.localidad);
                                    }
                                }}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.domicilio?.localidad?.nombre && formik.touched.domicilio?.localidad)}
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

                        <div className="d-flex justify-content-end">
                            <Button type="submit" disabled={!formik.isValid} variant="dark" className="mb-3 btn-ok">
                                Guardar
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Container>
        </section>
    );
}

export default Registro;