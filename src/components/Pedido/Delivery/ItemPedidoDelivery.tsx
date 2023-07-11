import { Pedido } from "../../../types/Pedido";
import { Button, Col, Row } from "react-bootstrap";
import '../ItemPedido.css'
import { useModal } from '../../../hooks/useModal';
import ModalDetallePedidoConfirmado from '../ModalDetallePedidoConfirmado';

//Util
import {formatearFecha} from "../../../util/dateUtil";


type ProductoParams = {
    pedido: Pedido;
    cambiarEstado: (id: number, pedidoActualizado:Pedido) => void;
}
function ItemPedidoDelivery({ pedido, cambiarEstado }: ProductoParams): JSX.Element {

    const { showModal, handleClose } = useModal();

    const cambiarListo = async () => {
        if(pedido.estado!=="Terminado"){
            const confirmarSeguirEditando = window.confirm("¿Pedido Entregado?");
            if (confirmarSeguirEditando) {
                pedido.estado="Terminado";
                cambiarEstado(pedido.id , pedido);
            }
        }
    };

    
    return(
        <>
            <Row className="tabla-cuerpo">
                <Col className="col-pedido">
                    { pedido.id }
                </Col>

                <Col className="col-pedido">
                    {formatearFecha(pedido.fecha)} 
                </Col>

                <Col className="col-pedido">
                    { pedido.cliente?.nombre + "\t" }
                    { pedido.cliente?.apellido }
                </Col>

                <Col className="col-pedido">
                    { pedido.cliente?.domicilio.calle +"\t" }
                    { pedido.cliente?.domicilio.numero }
                </Col>
                <Col className="col-pedido">
                    {pedido.cliente?.domicilio?.localidad?.nombre}
                </Col>
                <Col className="col-pedido">
                    {pedido.cliente?.telefono}
                </Col>
                <Col className="col-pedido">
                    <Button id="boton-detalle-acciones" onClick={cambiarListo}>Listo</Button>
                </Col>
                <Col className="col-pedido">
                    <Button id="boton-detalle" onClick={handleClose}>Detalle</Button>
                </Col>
            </Row>
            <ModalDetallePedidoConfirmado
                showModal={showModal}
                handleClose={handleClose}
                pedido={pedido}
            />
        </>
    );
}

export default ItemPedidoDelivery;