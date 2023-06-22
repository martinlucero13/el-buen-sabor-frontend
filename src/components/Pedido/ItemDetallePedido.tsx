
import { Col } from "react-bootstrap";


type ProductoParams = {
  nombre: string;
  tiempoPromedio: number;
  cantidad: number;
  precioVenta: number;
}

export const ItemDetallePedidoDelivery = (props: ProductoParams) => {
  
    return (
      <>
        <Col>{props.nombre}</Col>
        <Col>${props.precioVenta}</Col>
        <Col>{props.cantidad} {props.cantidad === 1 ? 'unidad' : 'unidades'}</Col>
        <Col >$ {props.cantidad*props.precioVenta}</Col>
      </>
    );
  };