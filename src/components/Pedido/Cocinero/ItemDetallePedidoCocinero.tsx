import { Button, Col } from "react-bootstrap";
import { useModal } from "../../../hooks/useModal";
import { Imagen } from "../../../types/Imagen";
import { ModalRecetaPedido } from "./ModalRecetaPedido";

type ProductoParams = {
    cantidad: number;
    denominacion: string;
    idArticulo: number;
}

export const ItemDetallePedidoCocinero= (props: ProductoParams) => {
    const { showModal, handleClose } = useModal();

    
    return (
    <>
        <Col>{props.denominacion}</Col>
        <Col>{props.cantidad} {props.cantidad === 1 ? 'unidad' : 'unidades'}</Col>
        <Col><Button variant="outline-info" onClick={() => handleClose()}>Receta</Button></Col>
        <ModalRecetaPedido
            showModal={showModal}
            handleClose={handleClose}
            idArticuloManufacturado={props.idArticulo}
        />
      </>
    );
  };