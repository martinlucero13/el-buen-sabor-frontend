import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation ,useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from "react";
import './ConfirmarPedido.css'

//Types
import { DetallePedido } from '../../types/DetallePedido';

//Util
import {validateNumericInput} from '../../util/numerosUtil';

export const ConfirmarPedido = () => {

    const [pedido, setPedido] = useState({
        formaEntrega: "", // Estado para almacenar la forma de entrega seleccionada
        formaPago: "" // Estado para almacenar la forma de pago seleccionada
    });
    const navigate = useNavigate();
    const location = useLocation();
    const carrito: DetallePedido[] = location.state;

    const handleChangeFormaEntrega = (event: ChangeEvent<HTMLInputElement>) => {
        const formaEntrega = event.target.value;
        let formaPago = "";
      
        if (formaEntrega === "Domicilio" && pedido.formaPago !== "Efectivo") {
          formaPago = "Mercado Pago";
        }
      
        setPedido((prevPedido) => ({
          ...prevPedido,
          formaEntrega,
          formaPago
        })); // Actualizar el estado cuando se cambie la forma de entrega
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
        if(pedido.formaEntrega&&pedido.formaPago){

            const pedidoNuevo = {
                detallePedido: carrito, // Aquí debes proporcionar el valor correcto para carrito
                tipoEntrega: pedido.formaEntrega,
                tipoPago: pedido.formaPago,
                descuento: descuento,
                subtotal: subtotal,
                confirmado: false
            };
            navigate('detallePedido', { state: pedidoNuevo});
        }
        else{
            alert("Completa el formulario")
        }
    }
    
    const handleChangeFormaPago = (event: ChangeEvent<HTMLInputElement>) => {
        const formaPago = event.target.value;
        setPedido((prevPedido) => ({
          ...prevPedido,
          formaPago
        })); // Actualizar el estado cuando se cambie la forma de pago
    };

    var descuento:number = 0;
    var subtotal:number = getCantidadTotalPrecio();
    var total:number = 0;

    if(pedido.formaEntrega === "Retiro Local"){
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
                        disabled={pedido.formaEntrega === "Domicilio" || pedido.formaEntrega ===""}
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
                        disabled={pedido.formaEntrega ===""}
                        onChange={handleChangeFormaPago} // Manejar el cambio de forma de pago
                        />
                    </div>
                    <div id="form-pago-efectivo">
                        <label>Dirección</label>
                        <Form.Control className="form-domicilio" type="text" name="denominacion" />
                    </div>
                    <div id="form-pago-efectivo">
                        <label>Departamento</label>
                        <Form.Control className="form-domicilio" type="text" name="denominacion" />
                    </div>
                    <div id="form-pago-efectivo">
                        <label>Teléfono</label>
                        <Form.Control className="form-domicilio" type="number" name="telefono" min={0} maxLength={10}onKeyDown={validateNumericInput}/>
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
