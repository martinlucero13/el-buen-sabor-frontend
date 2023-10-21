import { createContext, useContext } from 'react';
import { Pedido } from '../types/Pedido';
import { FormaPago } from '../types/FormaPago';
import { TipoEnvio } from '../types/TipoEnvio';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';


type PedidoContextType = {
  pedido: Pedido;
  setPedido: (updatedPedido: Pedido) => void;
  generarNumeroPedido: () => void;
};

const PedidoContext = createContext<PedidoContextType>({
  pedido: {
    id: 0,
    fecha: new Date(),
    estado: "",
    formaPago: FormaPago.EFECTIVO,
    formaEntrega: TipoEnvio.LOCAL,
    subtotal: 0,
    descuento: 0,
    total: 0,
    numeroPedido: "",
    cliente: 0,
    factura: { id: 0, cliente: 0, pedido: 0, fechaFacturacion: new Date(), fechaBaja: null },
    tiempoEstimadoPedido: ""
  },
  setPedido: () => { },
  generarNumeroPedido: () => { }
});

export function usePedido() {
  return useContext(PedidoContext);
}

type PedidoProviderProps = {
  children: React.ReactNode;
};

export function PedidoProvider({ children }: PedidoProviderProps) {
  const [pedido, setPedido] = useLocalStorage<Pedido>(
    'pedido',
    {
      id: 0,
      fecha: new Date(),
      estado: "",
      formaPago: FormaPago.EFECTIVO,
      formaEntrega: TipoEnvio.LOCAL,
      subtotal: 0,
      descuento: 0,
      total: 0,
      numeroPedido: "",
      cliente: 0,
      factura: { id: 0, cliente: 0, pedido: 0, fechaFacturacion: new Date(), fechaBaja: null },
      tiempoEstimadoPedido: ""
    }
  );

  function generarNumeroPedido() {
    const nuevoNumeroPedido = uuidv4().substring(0, 8);

    setPedido(prevPedido => ({
      ...prevPedido,
      numeroPedido: nuevoNumeroPedido,
    }));
  }

  return (
    <PedidoContext.Provider
      value={{
        pedido,
        setPedido,
        generarNumeroPedido
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}