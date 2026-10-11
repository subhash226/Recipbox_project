import React, { createContext, useContext, useEffect, useState } from "react";
import { addToCart as addCartLine, getCart, removeFromCart, setCartQuantity } from "../services/groceryStore";

const GroceryCartContext = createContext(null);

export function GroceryCartProvider({ children }) {
  const [cart, setCart] = useState(getCart);

  useEffect(() => {
    const sync = () => setCart(getCart());
    window.addEventListener("recipebox-cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("recipebox-cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const value = {
    cart,
    count: cart.reduce((sum, line) => sum + line.quantity, 0),
    addToCart: (productId, quantity = 1) => setCart(addCartLine(productId, quantity)),
    setQuantity: (productId, quantity) => setCart(setCartQuantity(productId, quantity)),
    removeFromCart: productId => setCart(removeFromCart(productId))
  };

  return <GroceryCartContext.Provider value={value}>{children}</GroceryCartContext.Provider>;
}

export function useGroceryCart() {
  const context = useContext(GroceryCartContext);
  if (!context) throw new Error("useGroceryCart must be used inside GroceryCartProvider.");
  return context;
}
