import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CartContextProvider } from '@/context/CartContext';
import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartContextProvider>
        <Head>
          <title>Kadu E-commerce</title>
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CartContextProvider>
    </>
  );
}
