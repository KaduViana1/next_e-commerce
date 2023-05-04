import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  function addToCart(productId) {
    setCartProducts(prev => [...prev, productId]);
  }

  function removeOneProduct(productId) {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function removeManyProducts(productId) {
    setCartProducts(prev => {
      return prev.filter(product => product !== productId);
    });
  }

  function resetCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        resetCart,
        removeOneProduct,
        removeManyProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
