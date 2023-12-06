import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form, Modal } from "react-bootstrap";

import { Endpoint } from "../../../types/Endpoint";
import { Rubro, FiltroRubro, TipoRubro } from "../../../types/Rubro";
import { useRubro } from "../../../hooks/useRubro";
import { useRubros } from "../../../hooks/useRubros";
import { validationSchemaRubro } from "./SchemaRubro";
import { save, update } from "../../../services/BaseService";
import { toastError, toastExito } from "../../../util/ToastUtil";
import { existsRubroByDenominacion } from "../../../services/RubroService";

interface Props {
    showModal: boolean;
    handleClose: () => void;
    handleReload : () => void;
    rubro?: Rubro;
}

/**
 * Componente para crear/actualizar un Rubro.
 */
function ModalRubro({ showModal, handleClose, handleReload, rubro }: Props): JSX.Element {
    const { rubro: values } = useRubro(rubro ? rubro.id : -1);
    const [tipoRubro, setTipoRubro] = useState<TipoRubro>(TipoRubro.INSUMO);
    const { rubros: rubrosPadres } = useRubros(FiltroRubro.TIPO, tipoRubro);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        formik.setValues(values);
    }, [values]);

    useEffect(() => {
        if (rubro) {
            setTipoRubro(
                rubro.esInsumo ? TipoRubro.INSUMO : TipoRubro.PRODUCTO
            );
        }
    }, [rubro]);
    
    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchemaRubro(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: Rubro) => handleSubmit(entity)
    });

    const handleChangeTipo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const esInsumo = Number(event.currentTarget.value) === 1 ? true : false;
        formik.setFieldValue(
            'esInsumo',
            esInsumo
        );
        setTipoRubro(
            esInsumo ? TipoRubro.INSUMO : TipoRubro.PRODUCTO
        );
    };

    const handleChangeRubroPadre = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const rubroPadreId = Number(event.currentTarget.value);
        formik.setFieldValue(
            'rubroPadreId',
            rubroPadreId === -1 ? null : rubroPadreId
        );
    };

    const handleSubmit = async (entity: Rubro) => {
        const token = await getAccessTokenSilently();

        if (entity.id === 0) {
            const exists = await existsRubroByDenominacion(entity.denominacion, token);
            
            if (!exists) {
                await save<Rubro>(Endpoint.Rubro, entity, token);
                toastExito(`El Rubro "${entity.denominacion}" se guardó exitosamente.`)
                handleResetFormik();
            } else {
                toastError(`No se pudo guardar el Rubro. Ya existe un Rubro denominado "${entity.denominacion}".`);
            }
        } else {
            const newValues = await update<Rubro>(Endpoint.Rubro, entity.id, entity, token);
            toastExito(`El Rubro "${entity.denominacion}" se actualizó exitosamente.`);
            handleResetFormik(newValues);
        }

        handleReset();
    };

    const handleReset = () => {
        handleReload();
        handleClose();
    };

    const handleResetFormik = (newValues?: Rubro) => {
        newValues ? formik.resetForm({ values: newValues }) : formik.resetForm(); 
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                {
                    <Modal.Title>
                        { rubro ? 'Editar' : 'Nuevo' } Rubro
                    </Modal.Title>
                }
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                        <Form.Control
                            type="text"
                            id="denominacion"
                            name="denominacion"
                            placeholder="Denominación"
                            value={formik.values.denominacion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
                        />
                        <Form.Control.Feedback type="invalid">
                            { formik.errors.denominacion }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Rubro</Form.Label>
                        <Form.Select
                            id="esInsumo"
                            name="esInsumo"
                            value={formik.values.esInsumo ? 1 : 0}
                            onChange={handleChangeTipo}
                            isInvalid={Boolean(formik.touched.esInsumo && formik.errors.esInsumo)}
                        >
                            <option value={0}>Producto</option>
                            <option value={1}>Ingrediente</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            { formik.errors.esInsumo }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rubro Principal</Form.Label>
                        <Form.Select 
                            id="rubroPadreId" 
                            name="rubroPadreId"
                            value={formik.values.rubroPadreId || -1} 
                            onChange={handleChangeRubroPadre}
                            isInvalid={Boolean(formik.touched.rubroPadreId && formik.errors.rubroPadreId)}
                        >
                            <option value="-1">--Seleccione--</option>
                            {
                                rubrosPadres.map((item: Rubro, index: number) =>
                                    <option key={index} value={item.id}>
                                        { item.denominacion }
                                    </option>
                                )
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            { formik.errors.rubroPadreId }
                        </Form.Control.Feedback>
                    </Form.Group>

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

export default ModalRubro;