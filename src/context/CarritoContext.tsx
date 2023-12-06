import { createContext, useContext, useState } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import CarritoCompras from "../components/Usuario/Cart/CarritoCompras";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { useArticulosManufacturadosSearch } from "../hooks/useArticulosManufacturadosSearch";


type ShoppingCartProviderProps = {
  children: React.ReactNode
}

export interface CartItem {
  id: number
  quantity: number
  tiempoEstimadoCocina: number;
  descuento: number
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id?: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
  articulosManufacturados: ArticuloManufacturado[];
  calcularSubtotal: () => number
  clearCart: () => void;
  isHoraEnRango: () => boolean;
  getCartItems: () => CartItem[]
  calcularTiempoEstimado: () => number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useCarrito() {
  return useContext(ShoppingCartContext)
}

export function CarritoProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const { articulosManufacturados } = useArticulosManufacturadosSearch();
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )

  function clearCart() {
    setCartItems([]);
  }
  function getCartItems(): CartItem[] {
    return [...cartItems];
  }
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  function getItemQuantity(id?: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function calcularSubtotal() {
    return cartItems.reduce((total, cartItem) => {
      const item = articulosManufacturados.find((i: ArticuloManufacturado) => i.id === cartItem.id);
      const precioVenta = item ? item.precioVenta : 0;
      return total + precioVenta * cartItem.quantity;
    }, 0);
  }
  const calcularTiempoEstimado = () => {
    let tiempoTotal = 0;
    for (const item of cartItems) {
      const articulo = articulosManufacturados.find(i => i.id === item.id);
      const tiempoEstimado = articulo?.tiempoEstimadoCocina || "00:00:00";
      const tiempoParts = tiempoEstimado.split(":");
      const minutos = parseInt(tiempoParts[0], 10) * 60 + parseInt(tiempoParts[1], 10);
      tiempoTotal += minutos * item.quantity;
    }
    return tiempoTotal;
  };
  
  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      const existingItem = currItems.find(item => item.id === id);

      if (!existingItem) {
        const newItem: CartItem = { id, quantity: 1, tiempoEstimadoCocina: 0, descuento: 0 };
        return [...currItems, newItem];
      }

      const updatedItems = currItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            tiempoEstimadoCocina: item.tiempoEstimadoCocina + item.tiempoEstimadoCocina,
          };
        }
        return item;
      });

      return updatedItems;
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      const existingItem = currItems.find(item => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        const updatedItems = currItems.map(item => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
              tiempoEstimadoCocina: item.tiempoEstimadoCocina - item.tiempoEstimadoCocina,
            };
          }
          return item;
        });

        return updatedItems;
      } else {
        return currItems.filter(item => item.id !== id);
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  function isHoraEnRango() {
    const hora = new Date();
    const diaSemana = hora.getDay();
    const horaDelDia = hora.getHours();
    return (
      (diaSemana !== 0 && horaDelDia >= 20) ||
      (diaSemana === 0 && horaDelDia === 0) ||
      (diaSemana !== 0 && horaDelDia < 12)
    );
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        clearCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        articulosManufacturados,
        calcularSubtotal,
        isHoraEnRango,
        getCartItems,
        calcularTiempoEstimado
      }}
    >
      {children}
      <CarritoCompras isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
export const useCart = (): ShoppingCartContext => {
  const context = useContext(ShoppingCartContext);
  return context;
};