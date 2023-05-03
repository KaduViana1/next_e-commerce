import Header from '@/components/Header';
import { CartContextProvider } from '@/context/CartContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartContextProvider>
        <Header />
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
