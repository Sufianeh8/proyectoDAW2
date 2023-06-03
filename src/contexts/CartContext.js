import { useState, useEffect, createContext } from "react";
import { Cart } from "@/api";
import { useRouter } from "next/router";

const cartCtrl = new Cart();

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(cartCtrl.count());

  useEffect(() => {
    const response = cartCtrl.getAll();
    setCart(response);
  }, []);

  const addCart = (productId, size) => {
    cartCtrl.add(productId, size);
    refreshTotalCart();
  };

  const changeQuantityItem = (productId, quantity) => {
    cartCtrl.changeQuantity(productId, quantity);
    refreshTotalCart();
  };

  const deleteItem = (productId) => {
    cartCtrl.delete(productId);
    refreshTotalCart();
  };

  const deleteAllItems = () => {
    cartCtrl.deleteAll();
    refreshTotalCart();
  };

  const refreshTotalCart = () => {
    setTotal(cartCtrl.count());
    setCart(cartCtrl.getAll());
  };

  const data = {
    cart,
    addCart,
    total,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
