import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado"
import { Button } from 'react-bootstrap';
import { useContext } from "react";
import { CarritoContext } from "../../Context/CarritoContext";


export const ItemArticuloManufacturado = (props: ArticuloManufacturado) => {
    const { agregarAlCarrito } = useContext(CarritoContext);


  return (
    <Card
      style={{ width: '18rem' }}
    >
      <Link to={`/detalle/${props.id}`}>
        <Card.Img
          src={props.imagen.imagenUrl}
          alt={props.denominacion}
          className="maxAltoImg"
          variant="top"
        />
      </Link>
      <Card.Body>
        <Card.Title>{props.denominacion}</Card.Title>
        <Card.Text>${props.articuloManufacturadoPrecioVenta.precioVenta}</Card.Text>
        <Button onClick={() => agregarAlCarrito(props)}>Agregar al carrito</Button>
      </Card.Body>
    </Card>
  );
}