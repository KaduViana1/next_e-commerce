const { createContext, useState } = require('react');

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <CartContextProvider value={{ cartProducts, setCartProducts }}>
      {children}
    </CartContextProvider>
  );
}
