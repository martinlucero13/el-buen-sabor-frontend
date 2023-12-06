import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useFormik } from "formik";

import { useCarrito } from "../../context/CarritoContext";
import { FormaPago } from "../../types/FormaPago";
import { TipoEnvio } from "../../types/TipoEnvio";
import { usePedido } from "../../context/PedidoContext";
import { EstadoPedido } from "../../types/EstadoPedido";
import { useCliente } from "../../hooks/useCliente";
import { validationSchemaPedido } from "./SchemaPedido";
import { Cliente } from "../../types/Cliente";
import { update } from "../../services/BaseService";
import { Endpoint } from "../../types/Endpoint";
import { toastExito } from "../../util/ToastUtil";
import { useEntities } from "../../hooks/useEntities";
import { Localidad } from "../../types/Localidad";
import { findTiempoEstimado } from "../../services/PedidoService";
import { convertirMinutosATiempo } from "../../util/PedidoUtil";

/**
 * Componente que muestra un formulario de Pedido.
 * Vista de Usuario.
 */
function PedidoForm(): JSX.Element {
    const { pedido, setPedido } = usePedido();
    const { calcularSubtotal, calcularTiempoEstimado } = useCarrito();
    const { getAccessTokenSilently } = useAuth0();

    const [deliveryType, setDeliveryType] = useState(TipoEnvio.LOCAL);
    const [formaPago, setFormaPago] = useState(FormaPago.EFECTIVO);
    const { user } = useAuth0();
    const { cliente } = useCliente(undefined, user?.sub);
    const { entities: localidades } = useEntities<Localidad>(Endpoint.Localidad);
    const [isStockAvailable, setIsStockAvailable] = useState(true);
    const [tiempoEstimadoOtrosPedidos, setTiempoEstimadoOtrosPedidos] = useState(0);
    const [convertido, setConvertido] = useState("");

    const obtenerTiempoOtrosPedidos = async () => {
        try {
            const token = await getAccessTokenSilently();
            const tiempoEstimado = await findTiempoEstimado(token);
            setTiempoEstimadoOtrosPedidos(tiempoEstimado);

            const tiempoCocina = calcularTiempoEstimado();
            const tiempoTotal = tiempoEstimado + tiempoCocina;

            const convertidoTiempo = convertirMinutosATiempo(tiempoTotal);
            setConvertido(convertidoTiempo);
        } catch (error) {
            console.error("Error al obtener el tiempo estimado de otros pedidos:", error);
        }
    };

    useEffect(() => {
        obtenerTiempoOtrosPedidos();

        if (tiempoEstimadoOtrosPedidos !== 1) {
            const tiempoCocina = calcularTiempoEstimado();
            let tiempoTotal = tiempoEstimadoOtrosPedidos + tiempoCocina;
            if (deliveryType === TipoEnvio.DELIVERY) {
                tiempoTotal += 10;
            }
            const convertidoTiempo = convertirMinutosATiempo(tiempoTotal);

            formik.setValues(cliente);
            const subtotal = calcularSubtotal();
            const descuento = deliveryType === TipoEnvio.LOCAL ? subtotal * 0.1 : 0;
            const total = subtotal - descuento;
            const numeroPedido = "";

            setPedido({
                ...pedido,
                fecha: new Date(),
                estado: EstadoPedido.CONFIRMAR,
                formaEntrega: deliveryType,
                formaPago: formaPago,
                subtotal: subtotal,
                descuento: descuento,
                total: total,
                numeroPedido: numeroPedido,
                cliente: cliente.id,
                tiempoEstimadoPedido: convertidoTiempo
            });

            localStorage.setItem('pedido', JSON.stringify(pedido));
        }
    }, [tiempoEstimadoOtrosPedidos, cliente, deliveryType, formaPago, calcularSubtotal]);

    const formik = useFormik({
        initialValues: cliente,
        validationSchema: validationSchemaPedido(cliente.id),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: Cliente) => handleSubmit(entity)
    });

    const handleSubmit = async (entity: Cliente) => {
        const token = await getAccessTokenSilently();
        await update<Cliente>(Endpoint.Cliente, entity.id, entity, token);
        toastExito('Sus datos se han actualizado exitosamente.');

    };

    const handleDeliveryTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as TipoEnvio;
        setDeliveryType(value);

        if (value === TipoEnvio.DELIVERY) {
            setFormaPago(FormaPago.MERCADO_PAGO);
        } else {
            setFormaPago(FormaPago.EFECTIVO);
        }
    };

    const handleMedioDePagoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as FormaPago;
        setFormaPago(value);
    };

    return (
        <section className="section-bg">
            <Container className="py-3">
                <div className="text-center">
                    <h1>El Buen Sabor</h1>
                </div>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Forma de pago</Form.Label>
                                <Form.Check
                                    type="radio"
                                    id="efectivo"
                                    label="Efectivo"
                                    value={FormaPago.EFECTIVO}
                                    name="medioDePago"
                                    required
                                    defaultChecked={formaPago === FormaPago.EFECTIVO}
                                    onChange={handleMedioDePagoChange}
                                    disabled={deliveryType === TipoEnvio.DELIVERY}
                                />
                                <Form.Check
                                    type="radio"
                                    id="mercadoPago"
                                    label="Mercado Pago"
                                    value={FormaPago.MERCADO_PAGO}
                                    required
                                    name="medioDePago"
                                    checked={formaPago === FormaPago.MERCADO_PAGO}
                                    onChange={handleMedioDePagoChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Forma de entrega</Form.Label>
                                <Form.Check
                                    type="radio"
                                    id="local"
                                    label="Retiro en local"
                                    value={TipoEnvio.LOCAL}
                                    name="formaEntrega"
                                    required
                                    defaultChecked={deliveryType === TipoEnvio.LOCAL}
                                    onChange={handleDeliveryTypeChange}
                                />
                                <Form.Check
                                    type="radio"
                                    id="domicilio"
                                    label="Recibir en domicilio"
                                    value={TipoEnvio.DELIVERY}
                                    required
                                    name="formaEntrega"
                                    defaultChecked={deliveryType === TipoEnvio.DELIVERY}
                                    onChange={handleDeliveryTypeChange}
                                />
                            </Form.Group>
                            <Row>
                                <span>
                                    <strong>Subtotal: </strong>${pedido.subtotal}
                                </span>
                                <span>
                                    <strong>Descuento: </strong>${pedido.descuento}
                                </span>
                                <span>
                                    <strong>Total: </strong>${pedido.total}
                                </span>
                            </Row>
                            <Row className="mt-3">
                                <Link to={isStockAvailable ? "/pedido-detalle" : "#"}>
                                    <Button className="btn-ok" variant="dark" disabled={!isStockAvailable}>
                                        Siguiente
                                    </Button>
                                </Link>
                            </Row>
                            <Row className="mt-3">
                                <Link to="/carrito-detalle">
                                    <Button className="btn-add" variant="dark">
                                        Volver
                                    </Button>
                                </Link>
                            </Row>
                        </Col>
                        <Col md={6}>
                            {deliveryType === TipoEnvio.DELIVERY && (
                                <>
                                    <Row>
                                        <Form.Group as={Col} md={12} className="mb-3">
                                            <Form.Label>Calle</Form.Label>
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
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md={12} className="mb-3">
                                            <Form.Label>Número</Form.Label>
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
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md={12} className="mb-3">
                                            <Form.Label>Localidad</Form.Label>
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
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md={12} className="mb-3">
                                            <Form.Label>Telefono</Form.Label>
                                            <Form.Control
                                                type="number"
                                                id="numero"
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
                                    </Row>
                                    <Button type="submit" disabled={!formik.isValid} variant="dark" className="btn-ok">
                                        Guardar cambios
                                    </Button>
                                </>
                            )}
                        </Col>
                    </Row>
                </Form>
            </Container>
        </section>

    );
}

export default PedidoForm;
