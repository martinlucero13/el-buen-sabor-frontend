import "./ItemPedidoCarrito.css"
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

//Services
import { findArticuloInsumoById } from "../../services/ArticuloInsumoService";
import { findByArticuloManufacturado } from "../../services/ArticuloManufacturadoInsumoService";

type ProductoParams = {
    id: number;
    idProducto: number;
    nombre: string;
    rutaImagen?: string;
    precioVenta: number;
    cantidad: number;
    borrarProducto: (id: number) => void;
    actualizarCantidad: (id: number,cantidad: number) => void;
}

const ItemPedidoCarrito = (props: ProductoParams) => {
    const [cantidad, setCantidad] = useState(props.cantidad);
    const { getAccessTokenSilently } = useAuth0();
    const [cantidadDisponible, setCantidadDisponible] = useState<Number>(0);

    const getReceta = async () => {
        const token = await getAccessTokenSilently();
      
        const recetaNueva = await findByArticuloManufacturado(props.idProducto, token);
        let cantidadFinal = 30;
      
        await Promise.all(
          recetaNueva.map(async (a) => {
            const newArticuloInsumo = await findArticuloInsumoById(a.articuloInsumoId, token);
            
            const cantidadMinima = Math.floor(Number(newArticuloInsumo.articuloInsumoStockActual.stockActual) / Number(newArticuloInsumo.articuloInsumoStockMinimo.stockMinimo));
            console.log(cantidadMinima);
            if (cantidadMinima < cantidadFinal) {
              cantidadFinal = cantidadMinima;
            }
          })
        );
      
        setCantidadDisponible(Number(cantidadFinal));
    };

    useEffect(() => {
        getReceta();
    }, []);

    function borrarItemPedido() {
        props.borrarProducto(props.id);
    }

    function incrementarCantidad() {
        if (cantidad < cantidadDisponible) {
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
                        <Button variant="outline-dark" disabled> {cantidad} </Button>
                        <Button variant="outline-dark" onClick={incrementarCantidad}>+</Button>
                        <div>Disponible: {cantidadDisponible}</div>
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