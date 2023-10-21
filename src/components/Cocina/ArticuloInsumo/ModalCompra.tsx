import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form, Modal } from "react-bootstrap";

import { ArticuloInsumo, ArticuloInsumoUpdate } from "../../../types/ArticuloInsumo";
import { validationSchemaArticuloInsumoCompra } from "./SchemaArticuloInsumoCompra";
import { updateStockArticuloInsumo } from "../../../services/ArticuloInsumoService";
import { toastExito } from "../../../util/ToastUtil";

interface Props {
    showModal: boolean;
    handleClose: () => void;
    handleReload: () => void;
    articuloInsumo: ArticuloInsumo;
}

/**
 * Componente para comprar un Artículo Insumo, actualizando el Stock/Precio de Costo.
 * Vista de Admin/Cocinero.
 */
function ModalCompra({ showModal, handleClose, handleReload, articuloInsumo }: Props): JSX.Element {
    const { getAccessTokenSilently } = useAuth0();
    const initialValues: ArticuloInsumoUpdate = {
        stockGanado: 0,
        stockPerdido: 0,
        precioCompra: articuloInsumo.precioCompra
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchemaArticuloInsumoCompra(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: ArticuloInsumoUpdate) => handleSubmit(entity)
    });

    const handleSubmit = async (entity: ArticuloInsumoUpdate) => {
        const token = await getAccessTokenSilently();

        await updateStockArticuloInsumo(articuloInsumo.id, entity, token);
        toastExito(`El Ingrediente "${articuloInsumo.denominacion}" se compró exitosamente.`);

        handleReset();
    };

    const handleReset = () => {
        formik.resetForm();
        handleReload();
        handleClose();
    };

    return (
        <Modal show={showModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Compra Ingrediente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="stock">Stock</Form.Label>
                        <Form.Control
                            type="number"
                            id="stock"
                            name="stockGanado"
                            placeholder="Stock"
                            value={formik.values.stockGanado}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.stockGanado && formik.touched.stockGanado)}
                        />
                        <Form.Control.Feedback type="invalid">
                            { formik.errors.stockGanado }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="precioCompra">Precio de Costo</Form.Label>
                        <Form.Control
                            type="number"
                            id="precioCompra"
                            name="precioCompra"
                            placeholder="Precio de Costo"
                            value={formik.values.precioCompra}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.precioCompra && formik.touched.precioCompra)}
                        />
                        <Form.Control.Feedback type="invalid">
                            { formik.errors.precioCompra }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Modal.Footer>
                        <Button onClick={handleClose} variant="dark" className="btn-cancel">
                            Cancelar
                        </Button>

                        <Button type="submit" disabled={!formik.isValid} variant="dark" className="btn-ok">
                            Aceptar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalCompra;