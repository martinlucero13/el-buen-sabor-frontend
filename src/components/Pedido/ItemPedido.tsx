import { Pedido } from "../../types/Pedido";
import { Button, Col, Row } from "react-bootstrap";
import './ItemPedido.css'
import { useModal } from '../../hooks/useModal';
import ModalDetallePedidoConfirmado from './ModalDetallePedidoConfirmado';


function ItemPedido(props: Pedido): JSX.Element {

    const { showModal, handleClose } = useModal();
    var estado = "";
    if(props.pagado === true){
        estado = "SI";
    }else{
        estado = "NO"
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
                    { props.tipoEntregaPedido?.descripcion }
                </Col>

                <Col className="col-pedido">
                    { props.tipoPagoPedido?.descripcion }
                </Col>
                <Col className="col-pedido">
                    {estado}
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

export default ItemPedido;
