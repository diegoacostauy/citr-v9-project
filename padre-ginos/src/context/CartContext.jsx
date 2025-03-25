import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

const initialCartState = [];

export const CartProvider = ({ children }) => {
  const cartHook = useState(initialCartState);
  return (
    <CartContext.Provider value={cartHook}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext);
}
