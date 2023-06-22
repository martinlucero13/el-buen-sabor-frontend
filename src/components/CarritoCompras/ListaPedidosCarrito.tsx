import { useEffect, useState, useContext } from 'react';

import { Container, Row, Button } from 'react-bootstrap';
import "./ItemPedidoCarrito.css";
import ItemPedidoCarrito from './ItemPedidoCarrito';
import { useNavigate, useLocation } from 'react-router-dom';
import { CarritoContext } from '../Context/CarritoContext';
import { DetallePedido } from '../../types/DetallePedido';


export const ListadoPedidoCarrito= () =>{

    const { carrito,borrarItemPedido } = useContext(CarritoContext);
    const [carritoTotal, setCarrito] = useState<DetallePedido[]>();
    
    
    const navigate = useNavigate();

    function handleButtonClick() {
        if(getCantidadTotalPedido()!==0){
            navigate('confirmarPedido', { state: carritoTotal});
        }
        else{
            alert("Debe tener al menos un producto....");
        }
    }
    
    const getPedidos = () => {
        if(carrito){
            setCarrito(carrito);
        }
    };

    function borrarCarritoItemPedido(id: number) {
        borrarItemPedido(id);
        setCarrito((prevPedido) => {
            if (!prevPedido) return prevPedido;
            const detallePedidoFiltrado = prevPedido.filter(
                (detallePedido) => detallePedido.articuloManufacturado.id !== id
            );
            
            return detallePedidoFiltrado;
        });
        
    }
    
    function actualizarCantidadProducto(id: number, cantidad: number) {
        setCarrito((prevPedido) => {
            if (!prevPedido || prevPedido.length === 0) return prevPedido;
            const detallePedidoActualizado = prevPedido.map((detallePedido) => {
                if (detallePedido.articuloManufacturado.id === id) {
                    const nuevaCantidad = (detallePedido.cantidad = cantidad);
                    if (nuevaCantidad > 5) {
                        return { ...detallePedido, cantidad: 5 };
                    } else {
                        return { ...detallePedido, cantidad: nuevaCantidad };
                    }
                } else {
                    return detallePedido;
                }
            }).filter((detallePedido) => detallePedido !== null) as DetallePedido[]; // Elimina los elementos nulos
            return detallePedidoActualizado;
        });
    }

    const getCantidadTotalPedido = () => {
        if (!carritoTotal || carritoTotal.length === 0) return 0;
        return carritoTotal.reduce((total, detallePedido) => total + detallePedido.cantidad, 0);
    };

    const getCantidadTotalPrecio = () => {
        if (!carritoTotal || carritoTotal.length === 0) return 0;
        let total:number = 0;
        carritoTotal.forEach((element: DetallePedido) => {
            total += element.cantidad * element.articuloManufacturado.articuloManufacturadoPrecioVenta.precioVenta;
        });
        return total;
    };

    useEffect(() => {
        getPedidos();
    }, []);

    function handleVolverClick() {
        navigate('/productos/all');
    }
    

    return (
        <>      
            <div style={{ padding: "10px", width: "1200px", margin: "auto"}}>
                <h3>Mi Pedido</h3>
                <Container fluid="sm" className="square border border-dark" id="contenedorPedidosCarrito">
                    {carritoTotal && carritoTotal.length > 0 ? (
                        carritoTotal.map((element: DetallePedido) => (
                        <Row key={element.id}>
                            <ItemPedidoCarrito
                            id={element.id}
                            idProducto={element.articuloManufacturado.id}
                            nombre={element.articuloManufacturado.denominacion}
                            rutaImagen={element.articuloManufacturado.imagen.imagenUrl}
                            precioVenta={element.articuloManufacturado.articuloManufacturadoPrecioVenta.precioVenta}
                            cantidad={element.cantidad}
                            disponible={5}
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