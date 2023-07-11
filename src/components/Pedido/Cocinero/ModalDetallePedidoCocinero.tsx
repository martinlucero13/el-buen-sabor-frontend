import { Row, Container, Modal } from 'react-bootstrap';
import { Pedido } from "../../../types/Pedido";
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ItemDetallePedidoCocinero } from '../Cocinero/ItemDetallePedidoCocinero';
import { DetallePedido } from '../../../types/DetallePedido';

//Service
import { findByPedidoId } from "../../../services/DetallePedidoService";


type Props = {
    showModal: boolean,
    handleClose: () => void,
    pedido: Pedido
}
export const ModalDetallePedidoCocinero=({ showModal, handleClose, pedido }: Props)=>{

    const [detallesPedido, setDetallePedido] = useState<DetallePedido[]>([]);
    const { getAccessTokenSilently } = useAuth0();


    const getDetallePedido = async () => {
        const token = await getAccessTokenSilently();
        const newDetalles: DetallePedido[] = await findByPedidoId(pedido.id,token);
  
        setDetallePedido(newDetalles);
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
                        {detallesPedido.map((element: DetallePedido) =>
                            <Row key={element.id}>
                                <ItemDetallePedidoCocinero
                                    denominacion={element.articuloManufacturado.denominacion}
                                    cantidad={element.cantidad}
                                    idArticulo={element.articuloManufacturado.id}
                                />
                            </Row>
                        )}
                    </Modal.Body>
                        
                </Container>
            </Modal>
        </>
    );

}

export default ModalDetallePedidoCocinero;