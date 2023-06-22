import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { Rubro } from "../../types/Rubro";
import { useAlert } from "../../hooks/useAlert";
import { findAllParents, saveRubro, updateRubro } from "../../services/RubroService";

type Props = {
    showModal: boolean,
    handleClose: () => void,
    rubro?: Rubro
}

function ModalRubro({ showModal, handleClose, rubro }: Props): JSX.Element {
    const [values, setValues] = useState<Rubro>({
        id: 0,
        denominacion: ""
    });

    const [rubrosPadres, setRubrosPadres] = useState<Rubro[]>([]);
    const { showAlert, handleAlert } = useAlert();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (rubro) {
            if (rubro.rubroPadreId === null) {
                setValues({
                    id: rubro.id,
                    denominacion: rubro.denominacion
                });
            } else {
                setValues({
                    id: rubro.id,
                    denominacion: rubro.denominacion,
                    rubroPadreId: rubro.rubroPadreId
                });
            }
        }
        getRubrosPadres();
    }, []);

    const getRubrosPadres = async () => {
        const token = await getAccessTokenSilently();
        const newRubrosPadres: Rubro[] = await findAllParents(token);

        setRubrosPadres(newRubrosPadres);
    };

    const handleChangeDenominacion = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDenominacion = event.target.value;

        setValues((prevState) => ({
            ...prevState,
            denominacion: newDenominacion
        }));
    };

    const handleChangeRubroPadre = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const rubroPadreId = Number(event.currentTarget.value);

        if (rubroPadreId === -1) {
            setValues((prevState) => ({
                ...prevState,
                rubroPadreId: NaN,
            }));
        } else {
            setValues((prevState) => ({
                ...prevState,
                rubroPadreId: rubroPadreId,
            }));
        }
    };

    const handleSubmit = async () => {
        if (!values.denominacion) {
            handleAlert();
        } else {
            const token = await getAccessTokenSilently();
            if (values.id === 0) {
                await saveRubro(values, token);
            } else {
                await updateRubro(values.id, values, token);
            }
            handleClose();
            window.location.reload();
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                {rubro
                    ?
                    <Modal.Title className="text-center">Editar Rubro</Modal.Title>
                    :
                    <Modal.Title className="text-center">Nuevo Rubro</Modal.Title>
                }
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                        <Form.Control
                            type="text"
                            id="denominacion"
                            name="denominacion"
                            placeholder="Ingrese denominacion"
                            value={values?.denominacion || ""}
                            onChange={handleChangeDenominacion}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rubro Artículo Padre</Form.Label>
                        <Form.Select id="rubroPadre" value={values?.rubroPadreId || -1} onChange={handleChangeRubroPadre}>
                            <option value="-1">--Seleccione--</option>
                            {
                                rubrosPadres.map((item: Rubro, index: number) =>
                                    <option value={item.id} key={index}>
                                        {item.denominacion}
                                    </option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>
                </Form>
                <Alert show={showAlert} onClick={handleAlert} variant="danger" dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>Debe llenar todos los campos</p>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="danger buttons-modal-form">
                    Cerrar
                </Button>

                <Button onClick={handleSubmit} variant="success">
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalRubro;