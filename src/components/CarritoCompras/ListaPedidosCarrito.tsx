import { useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ItemPedidoCarrito from './ItemPedidoCarrito';
import "./ItemPedidoCarrito.css";

//Context
import { CarritoContext } from '../Context/CarritoContext';

//Types
import { DetallePedido } from '../../types/DetallePedido';


export const ListadoPedidoCarrito = () => {
    const { carrito, borrarItemPedido, actualizarCantidad } = useContext(CarritoContext);
    const navigate = useNavigate();

    function handleButtonClick() {
        if (getCantidadTotalPedido() !== 0) {
            navigate('confirmarPedido', { state: carrito });
        } else {
            alert("Debe tener al menos un producto....");
        }
    }

    function borrarCarritoItemPedido(id: number) {
        borrarItemPedido(id);
    }

    function actualizarCantidadProducto(id: number, cantidad: number) {
        actualizarCantidad(id, cantidad);
    }

    const getCantidadTotalPedido = () => {
        if (!carrito || carrito.length === 0) return 0;
        return carrito.reduce((total, detallePedido) => total + detallePedido.cantidad, 0);
    };

    const getCantidadTotalPrecio = () => {
        if (!carrito || carrito.length === 0) return 0;
        let total = 0;
        carrito.forEach((element: DetallePedido) => {
            total += element.cantidad * element.articuloManufacturado.articuloManufacturadoPrecioVenta.precioVenta;
        });
        return total;
    };

    function handleVolverClick() {
        navigate('/productos/all');
    }
    

    return (
        <>
            <div style={{ padding: "10px", width: "1200px", margin: "auto" }}>
                <h3>Mi Pedido</h3>
                <Container fluid="sm" className="square border border-dark" id="contenedorPedidosCarrito">
                    {carrito && carrito.length > 0 ? (
                        carrito.map((element: DetallePedido) => (
                            <Row key={element.id}>
                                <ItemPedidoCarrito
                                    id={element.id}
                                    idProducto={element.articuloManufacturado.id}
                                    nombre={element.articuloManufacturado.denominacion}
                                    rutaImagen={element.articuloManufacturado.imagen.imagenUrl}
                                    precioVenta={element.articuloManufacturado.articuloManufacturadoPrecioVenta.precioVenta}
                                    cantidad={element.cantidad}
                                    borrarProducto={borrarCarritoItemPedido}
                                    actualizarCantidad={actualizarCantidadProducto}
                                />
                            </Row>
                        ))
                    ) : (
                            <p>No hay artículos en el carrito</p>
                        )}
                </Container>

                <div style={{ border: "1px solid black", padding: "20px", margin: "auto", width: "400px" }}>
                    <Row className="justify-content-center">
                        <div>
                            <p style={{ display: "inline-block", fontSize: "20px", font: "bold" }}>Artículos: {getCantidadTotalPedido()}</p>
                            <p style={{ display: "inline-block", marginLeft: "45%", fontSize: "20px", font: "bold" }}>$ {getCantidadTotalPrecio()}</p>
                        </div>
                    </Row>
                    <div className="mt-3">
                        <Button id="buttonCarrito" variant="primary" className="mb-2 d-block" onClick={handleVolverClick}>Continuar comprando</Button>
                        <Button id="buttonCarrito" variant="success" className="d-block" onClick={handleButtonClick}>Confirmar pedido</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListadoPedidoCarrito;