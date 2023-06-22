import { Button, Col, Container, Form, Row } from "react-bootstrap";
import './ConfirmarPedido.css'
import { ChangeEvent, useState } from "react";
import { DetallePedido } from '../../types/DetallePedido';
import { useLocation ,useNavigate } from 'react-router-dom';

export const ConfirmarPedido = () => {

    const [formaEntrega, setFormaEntrega] = useState(""); // Estado para almacenar la forma de entrega seleccionada
    const [formaPago, setFormaPago] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const carrito: DetallePedido[] = location.state;

    const handleChangeFormaEntrega = (event: ChangeEvent<HTMLInputElement>) => {
        const formaEntrega = event.target.value;
        setFormaEntrega(formaEntrega); // Actualizar el estado cuando se cambie la forma de entrega
      
        if (formaEntrega === "Domicilio" || formaEntrega === "Retiro Local") {
          setFormaPago("Mercado Pago"); // Establecer automáticamente la forma de pago a "Mercado Pago" si la forma de entrega es "Recibir en Domicilio" o "Retiro Local"
        } else {
          setFormaPago(""); // Restablecer la forma de pago a vacío si la forma de entrega es distinta a "Recibir en Domicilio" o "Retiro Local"
        }
    };

    const getCantidadTotalPrecio = () => {
        if (!carrito || carrito.length === 0) return 0;
        let total:number = 0;
        carrito.forEach((element: DetallePedido) => {
            total += element.cantidad * element.articuloManufacturado.articuloManufacturadoPrecioVenta.precioVenta;
        });
        return total;
    };

    function handleVolverClick() {
        navigate('/carrito');
    }

    function handleSiguienteClick() {
        if(formaEntrega&&formaPago){

            const pedido = {
                detallePedido: carrito, // Aquí debes proporcionar el valor correcto para carrito
                tipoEntrega: formaEntrega,
                tipoPago: formaPago,
                descuento: descuento,
                subtotal: subtotal,
                confirmado: false
            };
            navigate('detallePedido', { state: pedido});
        }
        else{
            alert("Completa el formulario")
        }
    }
    
    const handleChangeFormaPago = (event: ChangeEvent<HTMLInputElement>) => {
        setFormaPago(event.target.value); // Actualizar el estado cuando se cambie la forma de pago
    };

    var descuento:number = 0;
    var subtotal:number = getCantidadTotalPrecio();
    var total:number = 0;

    if(formaEntrega === "Retiro Local"){
        descuento = subtotal*0.10;
        total = subtotal - descuento;
    }else{
        descuento = 0;
        total = subtotal;
    }

    return (
    <>
      <Container className="contenedor">
        <h1>Mi Pedido</h1>
        <Row>
            <Col>
                <p>Forma de Entrega:</p>
                <Form id="form-entrega">
                    <div id="form-retiro-local">
                        <Form.Check
                        type="radio"
                        id="retiro-local"
                        name="forma-entrega"
                        label="Retiro Local 10%OFF"
                        value="Retiro Local"
                        onChange={handleChangeFormaEntrega} // Manejar el cambio de forma de entrega
                        />
                    </div>
                    <div id="form-retiro-dom">
                        <Form.Check
                        type="radio"
                        id="domicilio"
                        name="forma-entrega"
                        label="Recibir en Domicilio"
                        value="Domicilio"
                        onChange={handleChangeFormaEntrega} // Manejar el cambio de forma de entrega
                        />
                    </div>             
                </Form>
            </Col>
        </Row>
        <Row>
            <Col>
                <p>Forma de Pago:</p>
                <Form>
                    <div id="form-pago-efectivo">
                        <Form.Check
                        type="radio"
                        id="efectivo"
                        name="forma-pago"
                        label="Efectivo"
                        value="Efectivo"
                        disabled={formaEntrega === "Domicilio"}
                        onChange={handleChangeFormaPago} // Manejar el cambio de forma de pago
                        />
                    </div>
                    <div id="form-pago-mp">
                        <Form.Check
                        type="radio"
                        id="mercado-pago"
                        name="forma-pago"
                        label="Mercado Pago"
                        value="Mercado Pago"
                        checked={formaEntrega === "Domicilio" || formaEntrega === "Retiro Local"} // Marcar automáticamente si la forma de entrega es "Recibir en Domicilio" o "Retiro Local"
                        onChange={handleChangeFormaPago} // Manejar el cambio de forma de pago
                        />
                    </div>
                </Form>
            </Col>
        </Row>
        <Row>
            <Col>
                <div id="div-detalle">
                    <Row>
                        <Col>
                            <p id="detalle-subtotal">Subtotal:</p>
                        </Col>
                        <Col>
                            <p id="detalle-subtotal-dato">$ {subtotal}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p id="detalle-descuento">Descuento:</p>
                        </Col>
                        <Col>
                            <p id="detalle-descuento-dato">$ {descuento}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col id="detalle-total">
                            <p >Total:</p>
                        </Col>
                        <Col id="detalle-total-dato">
                            <p >{"$" + total}</p>
                        </Col>
                    </Row>       
                </div>                
            </Col>
        </Row>
        <Row>
            <Col>
                <Button id="pedido-boton-siguiente" onClick={handleSiguienteClick}>Siguiente</Button>
            </Col>
        </Row>
        <Row>
            <Col>
                <Button id="pedido-boton-volver" onClick={handleVolverClick}>Volver</Button>
            </Col>
        </Row>
      </Container>
    </>
  );
};
