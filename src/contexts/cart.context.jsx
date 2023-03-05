import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  cartCount: 0,

});

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((item) => {
    return item.id === productToAdd.id;
  });

  if (existingCartItem) {
    return cartItems.map((item) => {
      return item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item;
    });

  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, item) => {
      return acc + item.quantity
    }, 0);
    setCartCount(newCartCount);
  },
  [cartItems]);

const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems , cartCount };



return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
