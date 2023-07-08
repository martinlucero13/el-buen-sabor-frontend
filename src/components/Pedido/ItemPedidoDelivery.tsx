import { Pedido } from "../../types/Pedido";
import { Button, Col, Row } from "react-bootstrap";
import './ItemPedido.css'
import { useModal } from '../../hooks/useModal';
import ModalDetallePedidoConfirmado from './ModalDetallePedidoConfirmado';


function ItemPedidoDelivery(props: Pedido): JSX.Element {

    const { showModal, handleClose } = useModal();
    var estadoPago = "";
    if(props.pagado === true){
        estadoPago = "SI";
    }else{
        estadoPago = "NO"
    }
    
    return(
        <>
            <Row id="tabla-cuerpo">
                <Col className="col-pedido">
                    { props.id }
                </Col>

                <Col className="col-pedido">
                    {props.fecha + "\t"} 
                    {props.horaEstimadaFin}
                </Col>

                <Col className="col-pedido">
                    { props.cliente?.nombre + "\t" }
                    { props.cliente?.apellido }
                </Col>

                <Col className="col-pedido">
                    { props.cliente?.domicilio.calle +"\t" }
                    { props.cliente?.domicilio.numero }
                </Col>
                <Col className="col-pedido">
                    {props.cliente?.domicilio?.localidad?.nombre}
                </Col>
                <Col className="col-pedido">
                    {props.cliente?.telefono}
                </Col>
                <Col className="col-pedido">
                    {props.estado}
                </Col>
                <Col className="col-pedido">
                    <Button id="boton-detalle" onClick={handleClose}>Detalle</Button>
                </Col>
            </Row>
            <ModalDetallePedidoConfirmado
                showModal={showModal}
                handleClose={handleClose}
                pedido={props}
                receta={false}
            />
        </>
    );
}

export default ItemPedidoDelivery;