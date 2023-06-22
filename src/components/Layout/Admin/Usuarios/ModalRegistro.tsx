import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form, Modal } from "react-bootstrap";
import { ChangeEvent, useEffect, useState } from "react";

import { Rol } from "../../../types/Rol";
import { Cliente } from "../../../types/Cliente";
import { Usuario } from "../../../types/Usuario";
import { Domicilio } from "../../../types/Domicilio";
import { Localidad } from "../../../types/Localidad";

type Props = {
    showModal: boolean,
    handleClose: () => void,
    cliente?: Cliente
}

function ModalRegistro({ showModal, handleClose, cliente }: Props): JSX.Element {
    const [valuesRol, setValuesRol] = useState<Rol>({
        "id": 0,
        "nombre": "",
        "auth0RolId": ""
    });
    const [valuesUsuario, setValuesUsuario] = useState<Usuario>({
        "id": 0,
        "auth0Id": "",
        "usuario": "",
        "rol": valuesRol
    });
    const [valuesLocalidad, setValuesLocalidad] = useState<Localidad>({
        "id": 0,
        "nombre": ""
    });
    const [valuesDomicilio, setValuesDomicilio] = useState<Domicilio>({
        "id": 0,
        "calle": "",
        "numero": 0,
        "localidad": valuesLocalidad
    });
    const [valuesCliente, setValuesCliente] = useState<Cliente>({
        "id": 0,
        "nombre": "",
        "apellido": "",
        "telefono": 0,
        "usuario": valuesUsuario,
        "domicilio": valuesDomicilio
    });
    const [validated, setValidated] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (cliente) {
            setValuesCliente(cliente);
            setValuesUsuario(cliente.usuario);
            setValuesDomicilio(cliente.domicilio);
            setValuesLocalidad(cliente.domicilio.localidad);
            setValuesRol(cliente.usuario.rol);
        }
    }, [cliente]);

    /*
    const resetValues = () => {
        setValuesCliente({});
        setValuesUsuario({});
        setValuesDomicilio({});
        setValuesLocalidad({});
        setValuesRol({});
    };*/

    const handleChangeNombre = (event: ChangeEvent<HTMLInputElement>) => {
        const newNombre = event.target.value;
        setValuesCliente((prevState) => ({
            ...prevState,
            nombre: newNombre
        }));
    };

    const handleChangeApellido = (event: ChangeEvent<HTMLInputElement>) => {
        const newApellido = event.target.value;
        setValuesCliente((prevState) => ({
            ...prevState,
            apellido: newApellido
        }));
    };

    const handleChangeTelefono = (event: ChangeEvent<HTMLInputElement>) => {
        const newTelefono: number = parseInt(event.target.value);
        setValuesCliente((prevState) => ({
            ...prevState,
            telefono: newTelefono
        }));
    };

    const handleChangeCalle = (event: ChangeEvent<HTMLInputElement>) => {
        const newCalle = event.target.value;
        setValuesDomicilio((prevState) => ({
            ...prevState,
            calle: newCalle
        }));
        setValuesCliente((prevState) => ({
            ...prevState,
            domicilio: valuesDomicilio
        }))
    };

    const handleChangeNumero = (event: ChangeEvent<HTMLInputElement>) => {
        const newNumero: number = parseInt(event.target.value);
        setValuesDomicilio((prevState) => ({
            ...prevState,
            numero: newNumero
        }));
        setValuesDomicilio((prevState) => ({
            ...prevState,
            domicilio: valuesDomicilio
        }))
    };

    const handleChangeLocalidad = (event: ChangeEvent<HTMLInputElement>) => {
        const newLocalidad = event.target.value;
        setValuesLocalidad((prevState) => ({
            ...prevState,
            nombre: newLocalidad
        }))
        setValuesDomicilio((prevState) => ({
            ...prevState,
            localidad: valuesLocalidad
        }))
        setValuesCliente((prevState) => ({
            ...prevState,
            domicilio: valuesDomicilio
        }))

    };

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setValuesUsuario((prevState) => ({
            ...prevState,
            usuario: newEmail
        }));
        setValuesCliente((prevState) => ({
            ...prevState,
            usuario: valuesUsuario
        }))
    };

    const handleChangeContrasenia = (event: ChangeEvent<HTMLInputElement>) => {
        const newContrasenia = event.target.value;
        setValuesUsuario((prevState) => ({
            ...prevState,
            clave: newContrasenia
        }));
        setValuesCliente((prevState) => ({
            ...prevState,
            usuario: valuesUsuario
        }))
    };

    const handleChangeConfirmarContrasenia = (event: ChangeEvent<HTMLInputElement>) => {
        const newConfirmarContrasenia = event.target.value;
    };

    const handleChangeRol = (event: ChangeEvent<HTMLSelectElement>) => {
        const newRol = event.currentTarget.value;
        setValuesRol((prevState) => ({
            ...prevState,
            rol: newRol
        }))
        setValuesUsuario((prevState) => ({
            ...prevState,
            rol: valuesRol
        }))
        setValuesCliente((prevState) => ({
            ...prevState,
            usuario: valuesUsuario
        }))
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            const token = await getAccessTokenSilently();

            if (valuesCliente.id === 0) {
                // TODO: Peticion crear nuevo cliente
                // await saveCliente(valuesCliente, token);
                // resetValues();
            } else {
                // TODO: Peticion actualizar cliente
                // await updateCliente(valuesCliente.id, valuesCliente, token);
            }
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                {cliente
                    ?
                    <Modal.Title className="text-center">Editar Cliente</Modal.Title>
                    :
                    <Modal.Title className="text-center">Nuevo Cliente</Modal.Title>
                }
            </Modal.Header>

            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="nombre">Nombre</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingrese nombre"
                            value={valuesCliente?.nombre || ""}
                            onChange={handleChangeNombre}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="apellido">Apellido</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="apellido"
                            name="apellido"
                            placeholder="Ingrese apellido"
                            value={valuesCliente?.apellido || ""}
                            onChange={handleChangeApellido}
                        />

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="telefono">Telefono</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                id="telefono"
                                name="telefono"
                                placeholder="Ingrese telefono"
                                value={valuesCliente?.telefono || ""}
                                onChange={handleChangeTelefono}
                            />
                        </Form.Group>

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="calle">Calle</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="calle"
                            name="calle"
                            placeholder="Ingrese calle"
                            value={valuesDomicilio?.calle || ""}
                            onChange={handleChangeCalle}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="numero">Numero</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            id="numero"
                            name="numero"
                            placeholder="Ingrese numero"
                            value={valuesDomicilio?.numero || ""}
                            onChange={handleChangeNumero}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="localidad">Localidad</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="localidad"
                            name="localidad"
                            placeholder="Ingrese localidad"
                            value={valuesLocalidad?.nombre || ""}
                            onChange={handleChangeLocalidad}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="usuario">Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            id="usuario"
                            name="usuario"
                            placeholder="Ingrese email"
                            value={valuesUsuario?.usuario || ""}
                            onChange={handleChangeEmail}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="clave">Contraseña</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            id="clave"
                            name="clave"
                            placeholder="Ingrese contra"
                            minLength={8}
                            //value={valuesUsuario?.clave || ""}
                            onChange={handleChangeContrasenia}
                        />
                        <Form.Control.Feedback type="invalid">La contraseña debe contener al menos 8 caracteres</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="confirmarClave">Confirmar Contraseña</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            id="confirmarClave"
                            name="confirmarClave"
                            placeholder="Ingrese contra"
                            //value={valuesUsuario?.clave || ""}
                            onChange={handleChangeConfirmarContrasenia}
                        />
                    </Form.Group>

                    {/* TODO: Implementar Rol petición al backend */}
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="confirmarClave">Rol</Form.Label>
                        <Form.Select onChange={handleChangeRol}>
                            <option>Seleccione</option>
                            <option>Usuario</option>
                            <option>Cajero</option>
                            <option>Delivery</option>
                            <option>Cocinero</option>
                            <option>Administrador</option>
                        </Form.Select>
                    </Form.Group>

                    <Button onClick={handleClose} variant="danger buttons-modal-form">
                        Cerrar
                    </Button>
                    <Button type="submit" variant="success">
                        Guardar
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalRegistro;