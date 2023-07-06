import { Col, Row, Container, Modal } from 'react-bootstrap';
import { Pedido } from "../../types/Pedido";
import { ItemDetallePedido} from "./ItemDetallePedido";
import { DetallePedido } from '../../types/DetallePedido';
import { useEffect, useState } from 'react';
import { findByPedidoId } from "../../services/DetallePedidoService";
import { useAuth0 } from '@auth0/auth0-react';
import { ItemDetallePedidoCocinero } from './Cocinero/ItemDetallePedidoCocinero';

type Props = {
    showModal: boolean,
    handleClose: () => void,
    pedido: Pedido,
    receta: boolean
}

export const ModalDetallePedidoConfirmado=({ showModal, handleClose, pedido, receta }: Props)=>{

    const [detallesPedido, setDetallePedido] = useState<DetallePedido[]>([]);
    const { getAccessTokenSilently } = useAuth0();


    const getDetallePedido = async () => {
        const token = await getAccessTokenSilently();
        const newDetalles: DetallePedido[] = await findByPedidoId(pedido.id,token);
  
        setDetallePedido(newDetalles);
    };

    const getSubTotal = () => {
        let aux = 0;
        
        detallesPedido.forEach((element) => {
            aux += element.subTotal;
        });


        return(aux);
    };
      
  
    useEffect(() => {
        getDetallePedido();
    }, []);

    return(
        <>
            <Modal id="detallePedido-div" show={showModal} onHide={handleClose}>
                
                <Container fluid="md" className="square border border-dark">
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center">Pedido {pedido?.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col><p className="col-titulo-p">Fecha: {pedido.horaEstimadaFin}</p></Col>
                
                            <Col><p className="col-titulo-p">Subtotal: $ {getSubTotal()}</p></Col>
                        </Row>
                        <Row>
                            <Col><p className="col-titulo-p">Estado: {pedido.estado}</p></Col>
                    
                            <Col><p className="col-titulo-p">Descuento:  ${pedido?.montoDescuento}</p></Col>
                        </Row>
                        <Row>
                            <Col><p className="col-titulo-p">Forma de Pago: {pedido.tipoPagoPedido?.descripcion}</p></Col>
                        
                            <Col><p className="col-titulo-p">Total: ${(getSubTotal())-(pedido.montoDescuento)}</p></Col>
                        </Row>
                        <Row>
                            <Col><p className="col-titulo-p">Forma de Entrega: {pedido.tipoEntregaPedido?.descripcion}</p></Col>
                        </Row>

                        {detallesPedido.map((element: DetallePedido) =>
                            <Row key={element.id}>
                                {!receta ? (
                                    <ItemDetallePedido
                                        nombre={element.articuloManufacturado.denominacion}
                                        precioVenta={element.articuloManufacturado.articuloManufacturadoPrecioVenta.precioVenta}
                                        cantidad={element.cantidad}
                                        subtotal={element.subTotal}
                                    />
                                ): (
                                    <ItemDetallePedidoCocinero
                                        denominacion={element.articuloManufacturado.denominacion}
                                        cantidad={element.cantidad}
                                        idArticulo={element.articuloManufacturado.id}
                                    />
                                )}
                            </Row>
                        )}
                    </Modal.Body>
                        
                </Container>
            </Modal>
        </>
    );

}

export default ModalDetallePedidoConfirmado;