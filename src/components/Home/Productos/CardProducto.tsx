import "./Producto.css"
import { Link } from "react-router-dom"
import { Button, Card } from "react-bootstrap"
import { Dash, Plus } from "react-bootstrap-icons";

import { useCarrito } from "../../../context/CarritoContext";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado"
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { checkCartAvailability } from "../../../services/ArticuloManufacturadoService";
import { ArticuloCantidad } from "../../../types/ArticuloCantidad";

interface Props {
    producto: ArticuloManufacturado;
}

/**
 * Componente de tarjeta de producto que muestra información sobre un producto.
 */
function CardProducto({ producto }: Props): JSX.Element {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, cartItems } = useCarrito();
    const [isStockAvailable, setIsStockAvailable] = useState(true);
    const { getAccessTokenSilently } = useAuth0();
    const quantity = getItemQuantity(producto.id);

    useEffect(() => {
        const hasSufficientStock = async () => {
            const token = await getAccessTokenSilently();

            const articuloCantidad: ArticuloCantidad[] = cartItems.map(item => {
                return {
                    idArticuloManufacturado: item.id,
                    cantidad: item.quantity
                };
            });

            if (articuloCantidad.length > 0) {
                const isAvailable = await checkCartAvailability(articuloCantidad, token);
                setIsStockAvailable(isAvailable && (producto.stock >= quantity));
            }
        };

        hasSufficientStock();
    }, [producto.id, quantity, cartItems]);

    return (
        <Card className="bg-black text-white card-producto">
            <Link to={`/detalle-producto/${producto.id}`}>
                <Card.Img
                    src={producto.imagenURL}
                    alt={producto.denominacion}
                    variant="top"
                    loading="lazy"
                    className="rounded card-producto-img"
                />
            </Link>

            <Card.Body className="card-body-producto">
                <Card.Title className="text-uppercase">
                    {producto.denominacion}
                </Card.Title>

                <Card.Text>
                    ${producto.precioVenta}
                </Card.Text>

                {
                    quantity === 0 ? (
                        <div className="btn-middle w-100">
                            <Button onClick={() => increaseCartQuantity(producto.id)}
                                className="w-100 btn-add-producto fw-bolder"
                                disabled={producto.stock === 0 || !isStockAvailable}
                            >
                                AGREGAR
                            </Button>
                        </div>
                    ) : (
                        <div className="container-add-producto">
                            <div className="d-flex align-items-center justify-content-center btn-add-producto">
                                <Button onClick={() => decreaseCartQuantity(producto.id)} className="btn-add-subtract-producto">
                                    <Dash size={25} />
                                </Button>

                                <span className="fw-bold">
                                    {quantity}
                                </span>

                                <Button onClick={() => increaseCartQuantity(producto.id)}
                                    className="btn-add-subtract-producto"
                                    disabled={producto.stock === 0 || !isStockAvailable}
                                >
                                    <Plus size={25} />
                                </Button>
                            </div>
                        </div>
                    )
                }

                {(producto.stock === 0 || !isStockAvailable) && (
                    <div className="sin-stock">
                        Sin stock
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}

export default CardProducto;