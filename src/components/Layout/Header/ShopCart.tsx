import "./Header.css";
import { Button } from "react-bootstrap";
import { Cart3 } from "react-bootstrap-icons";

import { useCarrito } from "../../../context/CarritoContext";

/**
 * Componente que representa un ícono de carrito de compras en la barra de navegación.
 */
function ShopCart(): JSX.Element {
    const { openCart, cartQuantity } = useCarrito();

    return (
        <Button onClick={openCart} className="btn-cart">
            <Cart3 size={25} color="white" />
            <div className="d-flex justify-content-center align-items-center rounded-circle bg-light text-dark cart-cantidad">
                { cartQuantity }
            </div>
        </Button>
    );
}

export default ShopCart;