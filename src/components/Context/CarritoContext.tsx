import React, { createContext, useState } from "react";
import { ArticuloManufacturado } from '../../types/ArticuloManufacturado';
import { DetallePedido } from '../../types/DetallePedido';

interface CarritoContextType {
  carrito: DetallePedido[];
  agregarAlCarrito: (articulo: ArticuloManufacturado) => void;
  borrarItemPedido: (id: number) => void;
}

export const CarritoContext = createContext<CarritoContextType>({
  carrito: [],
  agregarAlCarrito: () => {},
  borrarItemPedido: () => {},
});

const CarritoProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [carrito, setCarrito] = useState<DetallePedido[]>([]);

  const agregarAlCarrito = (articulo: ArticuloManufacturado) => {
    const detallePedido: DetallePedido = {
      id: articulo.id,
      cantidad: 1,
      subTotal: articulo.articuloManufacturadoPrecioVenta.precioVenta,
      articuloManufacturado: articulo,
      
    };

    const existeEnCarrito = carrito.some((item) => item.id === articulo.id);
    if (!existeEnCarrito) {
      setCarrito((prevCarrito) => [...prevCarrito, detallePedido]);
    }
  };

  const borrarItemPedido = (id: number) => {
    setCarrito((prevPedido) => {
      if (!prevPedido) return prevPedido;
      const detallePedidoFiltrado = prevPedido.filter(
        (detallePedido) => detallePedido.articuloManufacturado.id !== id
      );
      return detallePedidoFiltrado;
    });
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, borrarItemPedido }}>
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoProvider;
