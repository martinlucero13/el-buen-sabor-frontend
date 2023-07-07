import { Button, Col, Row, Container } from "react-bootstrap";
import { ItemDetallePedido } from "../Pedido/ItemDetallePedido";
import { useLocation, useNavigate } from 'react-router-dom';
import "./DetallePedido.css";

//Types
import { DetallePedido } from '../../types/DetallePedido';

type ProductoParams = {
    detallePedido: DetallePedido[];
    tiempoEstimado: number;
    tipoEntrega: string;
    tipoPago: string;
    descuento?: number;
    subtotal: number;
    confirmado: boolean;
    numero?: number;
    estado?: string;
    fecha?: string;
}

export const DetallePedidoSN=()=>{

    const location = useLocation();
    const pedido: ProductoParams = location.state;
    const navigate = useNavigate();

    function handleConfirmarPedidoClick() {


        const currentDate = new Date();

        const currentDateString = currentDate.toISOString();

        const pedidofinal = {
            detallePedido: pedido.detallePedido,
            tipoEntrega: pedido.tipoEntrega,
            tipoPago: pedido.tipoPago,
            descuento: pedido.descuento,
            subtotal: pedido.subtotal,
            confirmado: true,
            estado: "A Confirmar",
            numero: 1,
            fecha: currentDateString
            

        };
        navigate('/detallePedido', { state: pedidofinal});

    }

    //Crear pedido en base de datos con estado PENDIENTE
    function handlePagarMercadoPagoClick() {
      
        const preferenceData = {
          items: [
			{
				title: "Mi Pedido",
				unit_price: total,
				quantity: 1
			}
		],
          payment_methods: {
            excluded_payment_methods: [{ id: 'visa' }],
            excluded_payment_types: [{ id: 'atm' }],
          },
          back_urls: {
            success: 'https://tudominio.com/pago-exitoso',
            failure: 'https://tudominio.com/pago-fallido',
            pending: 'https://tudominio.com/pago-pendiente',
          },
          auto_return: 'approved' as 'approved',
        };
      
        // Crear la preferencia de pago
        fetch('https://api.mercadopago.com/checkout/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer TEST-276680005770653-051214-d11f6e93b1a6ce51e43e2737f96e2d51-396810422',
          },
          body: JSON.stringify(preferenceData),
        })
          .then((response) => response.json())
          .then((data) => {
            const initPoint = data.init_point;
            window.location.href = initPoint;
          })
          .catch((error) => {
            // Manejar el error en caso de fallo en la creación de la preferencia
            console.error(error);
          });
    }

      

    const renderButton = () => {
        if(pedido.confirmado){
            return <Button variant="danger" id="pedido-boton-detallePedido">Cancelar Pedido</Button>;
        }
        else{
            if (pedido.tipoPago === "Efectivo") {
                return <Button variant="success" id="pedido-boton-detallePedido" onClick={handleConfirmarPedidoClick}>Confirmar Pedido</Button>;
            } else{
                return <Button variant="info" id="pedido-boton-detallePedido" onClick={handlePagarMercadoPagoClick}>Pagar Con Mercado Pago</Button>
            }
        }
        
    };

    const total = pedido.subtotal - (pedido.descuento || 0);

    return(
        <>
            
            <div id="detallePedido-div">
                <Container fluid="sm" className="square border border-dark">
                    <h1>Pedido {pedido.confirmado? pedido.numero: "S/N"}</h1>
                    <Row>
                        <Col><p className="col-titulo-p">Fecha: {pedido.confirmado? pedido.fecha:"-"}</p></Col>
            
                        <Col><p className="col-titulo-p">Subtotal: ${pedido.subtotal}</p></Col>
                    </Row>
                    <Row>
                        <Col><p className="col-titulo-p">Estado: {pedido.confirmado? pedido.estado:"-"}</p></Col>
                
                        <Col><p className="col-titulo-p">Descuento:  ${pedido?.descuento}</p></Col>
                    </Row>
                    <Row>
                        <Col><p className="col-titulo-p">Forma de Pago: {pedido.tipoPago}</p></Col>
                    
                        <Col><p className="col-titulo-p">Total: ${total}</p></Col>
                    </Row>
                    <Row>
                        <Col><p className="col-titulo-p">Forma de Entrega: {pedido.tipoEntrega}</p></Col>
                    </Row>

                    {pedido.detallePedido?.map((element: DetallePedido) =>
                    <Row key={element.id}>
                        <ItemDetallePedido
                            nombre= {element.articuloManufacturado.denominacion}
                            precioVenta= {element.articuloManufacturado.articuloManufacturadoPrecioVenta.precioVenta}
                            cantidad= {element.cantidad}
                            subtotal= {element.cantidad*element.articuloManufacturado.articuloManufacturadoPrecioVenta.precioVenta}
                        />
                    </Row>
                    )}

                    
                </Container>
                {renderButton()}
                
            </div>
            
        </>
    );
}

export default DetallePedidoSN;