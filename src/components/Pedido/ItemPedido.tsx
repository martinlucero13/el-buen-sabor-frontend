import { Pedido } from "../../types/Pedido";
import { Button, Col, Form, Row } from "react-bootstrap";
import './ItemPedido.css'
import { useModal } from '../../hooks/useModal';
import ModalDetallePedidoConfirmado from './ModalDetallePedidoConfirmado';

//Util
import {formatearFecha} from "../../util/dateUtil";


function ItemPedido({ pedido, onEstadoChangeItem }: { pedido: Pedido; onEstadoChangeItem: (id: number, estado: string) => void }): JSX.Element {

    const { showModal, handleClose } = useModal();
    var estadoPago = "";
    if(pedido.pagado === true){
        estadoPago = "SI";
    }else{
        estadoPago = "NO"
    }


    const handleSelect = async (option:string) => {
        const updatedProps = { ...pedido, estado: option };
        await onEstadoChangeItem(pedido.id, updatedProps.estado);
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
                    { pedido.tipoEntregaPedido?.descripcion }
                </Col>

                <Col className="col-pedido">
                    { pedido.tipoPagoPedido?.descripcion }
                </Col>
                <Col className="col-pedido">
                    {estadoPago}
                </Col>
                <Col className="col-pedido">
                    <Form.Select name="rubro" value={pedido.estado} className={"options-form-select"} onChange={(e) => handleSelect(e.target.value)}>
                        <option value="A Confirmar">A Confirmar</option>
                        <option value="Cocina">Cocina</option>
                        <option value="Listo">Listo</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Terminado">Terminado</option>
                    </Form.Select>
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

export default ItemPedido;
