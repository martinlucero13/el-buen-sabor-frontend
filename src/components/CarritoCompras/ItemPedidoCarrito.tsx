import "./ItemPedidoCarrito.css"
import { useState } from "react";

import { Button, Card } from "react-bootstrap";

type ProductoParams = {
    id: number;
    idProducto: number;
    nombre: string;
    rutaImagen?: string;
    precioVenta: number;
    cantidad: number;
    disponible: number;
    borrarProducto: (id: number) => void;
    actualizarCantidad: (id: number,cantidad: number) => void;
}

const ItemPedidoCarrito = (props: ProductoParams) => {
    const [cantidad, setCantidad] = useState(props.cantidad);

    function borrarItemPedido() {
        props.borrarProducto(props.id);
    }

    function incrementarCantidad() {
        if (cantidad < props.disponible) {
            const nuevaCantidad = cantidad + 1;
            setCantidad(nuevaCantidad);
            props.actualizarCantidad(props.id,nuevaCantidad);
        }
    }

    function decrementarCantidad() {
        if (cantidad > 1) {
            const nuevaCantidad = cantidad - 1;
            setCantidad(nuevaCantidad);
            props.actualizarCantidad(props.id,nuevaCantidad);
        }
    }

    return (
        <>
            <Card id="card">
                <Card.Body id="grid">
                    <Card.Img id="imagenesPedido" src={props.rutaImagen} />
                    <Card.Text>
                        {props.nombre}
                        <br></br>${props.precioVenta}
                    </Card.Text>
                    <Card.Text>
                        <Button variant="outline-dark" onClick={decrementarCantidad}>-</Button>
                        <Button variant="outline-dark" disabled>
                            {cantidad}
                        </Button>
                        <Button variant="outline-dark" onClick={incrementarCantidad}>+</Button>
                        <br></br> Disponible: {props.disponible}
                    </Card.Text>
                    <Card.Text>${props.precioVenta * cantidad}</Card.Text>
                    <Button id="boton-item-receta-ingrediente" onClick={borrarItemPedido}>
                        <i className="bi bi-trash"></i>
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}
export default ItemPedidoCarrito;