
import { Col } from "react-bootstrap";


type ProductoParams = {
  nombre: string;
  cantidad: number;
  precioVenta: number;
  subtotal: number;
}

export const ItemDetallePedido= (props: ProductoParams) => {
  
    return (
      <>
        <Col>{props.nombre}</Col>
        <Col>${props.precioVenta}</Col>
        <Col>{props.cantidad} {props.cantidad === 1 ? 'unidad' : 'unidades'}</Col>
        <Col >$ {props.subtotal}</Col>
      </>
    );
  };