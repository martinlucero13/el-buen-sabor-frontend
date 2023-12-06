import { useEffect, useState } from "react";
import { Wallet } from '@mercadopago/sdk-react';
import { CartItem, useCarrito } from "../../context/CarritoContext";
import { useAuth0 } from "@auth0/auth0-react";
import { usePedido } from "../../context/PedidoContext";
import { DetallePedido } from "../../types/DetallePedido";
import { savePedido } from "../../services/PedidoService";
import { saveCompraArticulos, saveDetallePedido } from "../../services/DetallePedido";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Componente que retorna un boton para pagar con MercadoPago.
 * Vista de Usuario.
 * @param carItems: productos que se van a pagar
 */
function MercadoPagoPayment(): JSX.Element {
  const [preferenceId, setPreferenceId] = useState('');
  const { getAccessTokenSilently } = useAuth0();
  const [detallePedido, setDetallePedido] = useState<DetallePedido[]>([]);
  const { pedido } = usePedido();
  const { cartItems, clearCart } = useCarrito();
  const queryParams = new URLSearchParams(location.search);
  const mpstatus = queryParams.get('status');
  const [preferenceObtained, setPreferenceObtained] = useState(false); 

  useEffect(() => {
    mercadoPagoPayment().then(() => {
      setPreferenceObtained(true);
    });
    const newDetallePedido = cartItems.map((item) => ({
      id: item.id,
      cantidad: item.quantity,
      articuloManufacturado: item.id,
      pedido: pedido.numeroPedido,
    }));
    setDetallePedido(newDetallePedido);

    if (mpstatus === 'approved') {
      handleCommonSubmit();
    }
  }, []);


  const convertirACarritoDetallePedidoDTO = (cartItems: CartItem[]) => {
    return cartItems.map((item) => ({
      idArticuloManufacturado: item.id,
      cantidad: item.quantity,
      descuento: 10
    }));
  };

  const handleCommonSubmit = async () => {
    try {
      const newDetallePedido = cartItems.map((item) => ({
        id: item.id,
        cantidad: item.quantity,
        articuloManufacturado: item.id,
        pedido: pedido.numeroPedido,
      }));

      const token = await getAccessTokenSilently();
      await savePedido(token, pedido);
      await saveDetallePedido(token, newDetallePedido);
      await saveCompraArticulos(token, newDetallePedido);
      window.location.href = "/pedido-exito";
      clearCart()
    } catch (error) {
      console.log("Error al guardar el pedido:", error);
    }
  };

  const mercadoPagoPayment = async () => {
    try {
      const token = await getAccessTokenSilently();
      const cart = convertirACarritoDetallePedidoDTO(cartItems);
      const estadoEntrega = pedido.formaEntrega

      const response = await fetch(API_BASE_URL + '/mercado-pago/createPreference' +
        `?estadoEntrega=${estadoEntrega}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(cart),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.id) {
          setPreferenceId(data.id);
        }
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ml-2">
      {preferenceObtained && (
        <Wallet
          initialization={{ preferenceId: preferenceId }}
          customization={{ texts: { action: 'pay' } }}
        />
      )}
    </div>
  );
};

export default MercadoPagoPayment;