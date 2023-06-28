import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado"
import { Button } from 'react-bootstrap';
import { useContext,useState } from "react";
import { CarritoContext } from "../../Context/CarritoContext";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ArticuloManufacturado.css';

export const ItemArticuloManufacturado = (props: ArticuloManufacturado) => {
    const { agregarAlCarrito } = useContext(CarritoContext);

    const [mostrarBoton, setMostrarBoton] = useState(false);

    const handleMouseEnter = () => {
      setMostrarBoton(true);
    };
  
    const handleMouseLeave = () => {
      setMostrarBoton(false);
    };
  

  return (
    <Card
      style={{ width: '18rem' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/detalle/${props.id}`}>
        <Card.Img
          src={props.imagen.imagenUrl}
          alt={props.denominacion}
          className="maxAltoImg-item"
          variant="top"
        />
      </Link>
      <Card.Body>
        <Card.Title>{props.denominacion}</Card.Title>
        <Card.Text>${props.articuloManufacturadoPrecioVenta.precioVenta}</Card.Text>
        <TransitionGroup>
          {mostrarBoton && (
            <CSSTransition classNames="fade" timeout={300}>
              <Button onClick={() => agregarAlCarrito(props)}>Agregar al carrito</Button>
            </CSSTransition>
          )}
        </TransitionGroup>
      </Card.Body>
    </Card>
  );
}