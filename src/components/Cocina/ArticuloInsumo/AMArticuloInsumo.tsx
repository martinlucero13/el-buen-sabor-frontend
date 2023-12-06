import { useEffect } from "react";
import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { FiltroRubro, Rubro, TipoRubro } from "../../../types/Rubro";
import { Endpoint } from "../../../types/Endpoint";
import { UnidadMedida } from "../../../types/UnidadMedida";
import { ArticuloInsumo } from "../../../types/ArticuloInsumo";
import { useRubros } from "../../../hooks/useRubros";
import { useArticuloInsumo } from "../../../hooks/useArticuloInsumo";
import { save, update } from "../../../services/BaseService";
import { validationSchemaArticuloInsumo } from "./SchemaArticuloInsumo";
import { toastExito } from "../../../util/ToastUtil";

/**
 * Componente para crear/actualizar un Ingrediente.
 */
function AMArticuloInsumo(): JSX.Element {
    const { id } = useParams();
    const navigate = useNavigate();

    const { articuloInsumo } = useArticuloInsumo(Number(id));
    const { rubros } = useRubros(FiltroRubro.TIPO, TipoRubro.INSUMO);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        formik.setValues(articuloInsumo);
    }, [articuloInsumo]);

    const formik = useFormik({
        initialValues: { ...articuloInsumo },
        validationSchema: validationSchemaArticuloInsumo(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: ArticuloInsumo) => handleSubmit(entity)
    });

    const handleSubmit = async (entity: ArticuloInsumo) => {
        const token = await getAccessTokenSilently();

        if (entity.id === 0) {
            await save<ArticuloInsumo>(Endpoint.ArticuloInsumo, entity, token);
            toastExito(`El Ingrediente "${entity.denominacion}" se guardó exitosamente.`);
        } else {
            await update<ArticuloInsumo>(Endpoint.ArticuloInsumo, entity.id, entity, token);
            toastExito(`El Ingrediente "${entity.denominacion}" se actualizó exitosamente.`);
        }

        handleNavigate();
    };

    const handleNavigate = () => {
        navigate("/admin/stock/ingredientes");
    };

    return (
        <section>
            <Container className="mt-3 mb-3 container-amb">
                <h1 className="text-center text-dark">Ingrediente</h1>

                <Container className="py-3">
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="denominación">Denominación</Form.Label>
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
                            </Col>
                            <Col>
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
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="stockMinimo">Stock Mínimo</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="stockMinimo"
                                        name="stockMinimo"
                                        placeholder="Stock Mínimo"
                                        value={formik.values.stockMinimo}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockMinimo && formik.touched.stockMinimo)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.stockMinimo }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="stockActual">Stock Actual</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="stockActual"
                                        name="stockActual"
                                        placeholder="Stock Actual"
                                        value={formik.values.stockActual}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.stockActual }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="rubro">Rubro</Form.Label>
                                    <Form.Select
                                        id="rubro"
                                        name="rubro"
                                        value={JSON.stringify(formik.values.rubro) || ''}
                                        onChange={e => {
                                            try {
                                                formik.setFieldValue('rubro', JSON.parse(e.target.value));
                                            } catch (error) {
                                                formik.setFieldValue('rubro', articuloInsumo.rubro);
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.rubro && formik.touched.rubro)}
                                    >
                                        <option value=""></option>
                                        {
                                            rubros.map((item: Rubro) =>
                                                <option value={JSON.stringify(item)} disabled={item.bloqueado} key={item.id}>
                                                    { item.denominacion }
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        <p>Debe seleccionar un Rubro</p>
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="unidadMedida">Unidad de Medida</Form.Label>
                                    <Form.Select
                                        id="unidadMedida"
                                        name="unidadMedida"
                                        value={formik.values.unidadMedida}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.unidadMedida && formik.touched.unidadMedida)}
                                    >
                                        <option value=""></option>
                                        {
                                            Object.values(UnidadMedida).map((item) => (
                                                <option value={item} key={item}>
                                                    { item }
                                                </option>
                                            ))
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.unidadMedida }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="esInsumo">¿Es Insumo?</Form.Label>
                                <Form.Select
                                    id="esInsumo"
                                    name="esInsumo"
                                    value={formik.values.esInsumo ? '1' : '0'}
                                    onChange={(e) => formik.setFieldValue('esInsumo', e.target.value === '1')}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.touched.esInsumo && formik.errors.esInsumo)}
                                >
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.esInsumo }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <div className="d-flex justify-content-end mt-3 mb-3">
                            <Button onClick={handleNavigate} variant="dark" className="me-2 btn-cancel">
                                Cancelar
                            </Button>

                            <Button type="submit" disabled={!formik.isValid} variant="dark" className="btn-ok">
                                Guardar
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Container>
        </section>
    );
}

export default AMArticuloInsumo;