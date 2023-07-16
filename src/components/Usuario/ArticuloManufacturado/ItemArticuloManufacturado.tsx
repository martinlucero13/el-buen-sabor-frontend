import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ArticuloManufacturado.css';

//Types
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado"

//Context
import { CarritoContext } from "../../Context/CarritoContext";

export const ItemArticuloManufacturado = (props: ArticuloManufacturado) => {
  const { agregarAlCarrito } = useContext(CarritoContext);

  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleMouseEnter = () => {
    setMostrarBoton(true);
  };

  const handleMouseLeave = () => {
    setMostrarBoton(false);
  };

  const handleClick = () => {
    agregarAlCarrito(props);
    setMensaje(`${props.denominacion} ha sido añadida al carrito`);
  };

  return (
    <Card id="contenedor-card"
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
              <Button onClick={handleClick}>Agregar al carrito</Button>
            </CSSTransition>
          )}
        </TransitionGroup>
        {mensaje && <p>{mensaje}</p>}
      </Card.Body>
    </Card>
  );
}
