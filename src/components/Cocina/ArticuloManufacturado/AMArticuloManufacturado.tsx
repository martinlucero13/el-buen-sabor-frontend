import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PlusSquare, Trash3 } from "react-bootstrap-icons";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";

import { Endpoint } from "../../../types/Endpoint";
import { ArticuloInsumo } from "../../../types/ArticuloInsumo";
import { FiltroRubro, Rubro, TipoRubro } from "../../../types/Rubro";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { DetalleArticuloManufacturado } from "../../../types/DetalleArticuloManufacturado";
import { validationSchemaArticuloManufacturado } from "./SchemaArticuloManufacturado";
import { useModal } from "../../../hooks/useModal";
import { useRubros } from "../../../hooks/useRubros";
import { useEntities } from "../../../hooks/useEntities";
import { useArticuloManufacturado } from "../../../hooks/useArticuloManufacturado";
import { toastAdvertencia, toastExito } from "../../../util/ToastUtil";
import { generateImageName, isValidImagen } from "../../../util/ImagenUtil";
import { saveArticuloManufacturado, updateArticuloManufacturado } from "../../../services/ArticuloManufacturadoService";

/**
 * Componente para crear/actualizar un Producto.
 */
function AMArticuloManufacturado(): JSX.Element {
    const { id } = useParams();
    const navigate = useNavigate();

    const { articuloManufacturado } = useArticuloManufacturado(Number(id));
    const { rubros } = useRubros(FiltroRubro.TIPO, TipoRubro.PRODUCTO);
    const [file, setFile] = useState<File | null>(null);

    const [cantidad, setCantidad] = useState<number>(0);
    const { entities: articulosInsumos } = useEntities<ArticuloInsumo>(Endpoint.ArticuloInsumo, undefined, true);
    const [articuloInsumoSelected, setArticuloInsumoSelected] = useState<ArticuloInsumo | undefined>(undefined);

    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        formik.setValues(articuloManufacturado);
    }, [articuloManufacturado]);

    const formik = useFormik({
        initialValues: articuloManufacturado,
        validationSchema: validationSchemaArticuloManufacturado(Number(id)),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: ArticuloManufacturado) => handleSubmit(entity)
    });

    const handleChangeImagen = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];

            const imagen = generateImageName(file.name);

            setFile(file);
            formik.setFieldValue('imagen', imagen);
        }
    };

    const handleAddDetalle = async () => {
        if (articuloInsumoSelected && cantidad !== 0) {
            let updatedDetalles = [...formik.values.detalles];

            const existingDetalleIndex = updatedDetalles.findIndex(
                (item) => item.articuloInsumo.id === articuloInsumoSelected.id
            );

            if (existingDetalleIndex !== -1) {
                updatedDetalles = updatedDetalles.map((item, index) => {
                    if (index === existingDetalleIndex) {
                        return { ...item, cantidad: cantidad };
                    }
                    return item;
                });
            } else {
                const newDetalle = { id: 0, cantidad: cantidad, articuloInsumo: articuloInsumoSelected };
                updatedDetalles.push(newDetalle);
            }

            formik.setFieldValue('detalles', updatedDetalles);
            handleResetDetalle();
        }
    };

    const handleResetDetalle = () => {
        setArticuloInsumoSelected(undefined);
        setCantidad(0);
    };

    const handleDeleteDetalle = async (item: DetalleArticuloManufacturado) => {
        const updatedDetalles = formik.values.detalles.filter((detalle) => detalle.articuloInsumo.id !== item.articuloInsumo.id);
        formik.setFieldValue('detalles', [...updatedDetalles]);
    };

    const handleCosto = () => {
        let costo = 0;
        formik.values.detalles.map((detalle) => costo += (detalle.articuloInsumo.precioCompra * detalle.cantidad));

        return costo;
    };

    const handleSubmit = async (entity: ArticuloManufacturado) => {
        const isNew = entity.id === 0;
        const token = await getAccessTokenSilently();

        if (file !== null && !isValidImagen(file)) {
            toastAdvertencia('La Imagen ingresada no es válida, por favor inténtelo nuevamente.');
            return;
        }

        // POST
        if (isNew && file !== null) {
            await saveArticuloManufacturado(entity, file, token);
            toastExito(`El Producto "${entity.denominacion}" se guardó exitosamente.`);
            
        // PUT
        } else {
            // Con Imagen
            if (file !== null) {
                await updateArticuloManufacturado(entity.id, entity, token, file);
                
            // Sin Imagen
            } else {
                await updateArticuloManufacturado(entity.id, entity, token);
            }

            toastExito(`El Producto "${entity.denominacion}" se actualizó exitosamente.`);
        }

        handleNavigate();
    };

    const handleNavigate = () => {
        navigate("/admin/stock/productos");
    };

    return (
        <section>
            <Container className="mt-3 mb-3 container-amb">
                <h1 className="text-center text-dark">Producto</h1>

                <Container className="py-3">
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="denominacion"
                                        name="denominacion"
                                        placeholder="Denominación"
                                        defaultValue={formik.values.denominacion}
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
                                    <Form.Label htmlFor="descripcion">Descripción</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="descripcion"
                                        name="descripcion"
                                        placeholder="Descripción"
                                        defaultValue={formik.values.descripcion}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.descripcion && formik.touched.descripcion)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.descripcion }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="tiempoEstimadoCocina">Tiempo Estimado en Cocina</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="tiempoEstimadoCocina"
                                        name="tiempoEstimadoCocina"
                                        placeholder="Tiempo Estimado Cocina (HH:mm:ss)"
                                        defaultValue={formik.values.tiempoEstimadoCocina}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.tiempoEstimadoCocina && formik.touched.tiempoEstimadoCocina)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.tiempoEstimadoCocina }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="precioVenta">Precio de Venta</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="precioVenta"
                                        name="precioVenta"
                                        placeholder="Precio de venta"
                                        value={formik.values.precioVenta}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.precioVenta && formik.touched.precioVenta)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.precioVenta }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="imagen">Imagen</Form.Label>
                                    <Form.Control
                                        type="file"
                                        id="imagen"
                                        name="imagen"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleChangeImagen}
                                        required={formik.values.imagen === ''}
                                        isInvalid={Boolean(formik.errors.imagen && formik.touched.imagen)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.imagen }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
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
                                                formik.setFieldValue('rubro', articuloManufacturado.rubro);
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
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="receta">Receta</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        id="receta"
                                        name="receta"
                                        rows={3}
                                        placeholder="Procedimiento..."
                                        value={formik.values.receta}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.receta && formik.touched.receta)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.receta }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ingredientes</Form.Label>
                                    <Row>
                                        <Button onClick={handleClose} variant="dark" className="btn-add">
                                            Añadir Ingredientes
                                        </Button>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end mt-4">
                            <Button onClick={handleNavigate} variant="dark" className="me-2 btn-cancel">
                                Cancelar
                            </Button>

                            <Button type="submit" disabled={!formik.isValid} variant="dark" className="btn-ok">
                                Guardar
                            </Button>
                        </div>

                        { /* Modal Detalles */}
                        <Modal show={showModal} onHide={handleClose} centered size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title>Ingredientes</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="articuloInsumo">Ingrediente</Form.Label>
                                                <Form.Select
                                                    id="articuloInsumo"
                                                    name="articuloInsumo"
                                                    value={JSON.stringify(articuloInsumoSelected) || ""}
                                                    onChange={e => {
                                                        try {
                                                            setArticuloInsumoSelected(JSON.parse(e.target.value));
                                                        } catch (error) {
                                                        }
                                                    }}
                                                >
                                                    <option value=""></option>
                                                    {
                                                        articulosInsumos.map((item: ArticuloInsumo) => 
                                                            <option value={JSON.stringify(item)} disabled={item.bloqueado} key={item.id}>
                                                                { item.denominacion }
                                                            </option>
                                                        )
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="cantidad">Cantidad</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    id="cantidad"
                                                    name="cantidad"
                                                    placeholder="Cantidad"
                                                    value={cantidad}
                                                    onChange={e => setCantidad(Number(e.target.value))}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="unidadMedida">Unidad de Medida</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="unidadMedida"
                                                    name="unidadMedida"
                                                    placeholder="Unidad de Medida"
                                                    defaultValue={articuloInsumoSelected?.unidadMedida ?? ''}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Row>
                                                <Form.Label>Acciones</Form.Label>
                                            </Row>
                                            <Button onClick={handleAddDetalle} variant="dark" className="btn-add">
                                                <PlusSquare />
                                            </Button>
                                        </Col>
                                    </Row>

                                    <hr />

                                    {
                                        formik.values.detalles.map((item: DetalleArticuloManufacturado, index: number) =>
                                            <Row key={index} className="mb-1">
                                                <Col>
                                                    { item.articuloInsumo.denominacion }
                                                </Col>
                                                <Col>
                                                    { item.cantidad }
                                                </Col>
                                                <Col>
                                                    { item.articuloInsumo.unidadMedida }
                                                </Col>
                                                <Col>
                                                    <Button onClick={() => handleDeleteDetalle(item)} variant="danger">
                                                        <Trash3 />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )
                                    }

                                    <hr />

                                    <Row>
                                        <p className="text-end fw-bold">
                                            Costo Total: ${ handleCosto() }
                                        </p>
                                    </Row>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </Form>
                </Container>
            </Container>
        </section>
    );
}

export default AMArticuloManufacturado;