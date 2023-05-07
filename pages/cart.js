import { CartContext } from '@/context/CartContext';
import { useContext, useEffect, useState } from 'react';
import styles from '../styles/Cart.module.scss';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function Cart() {
  const {
    cartProducts,
    resetCart,
    addToCart,
    removeOneProduct,
    removeManyProducts,
  } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [street, setStreet] = useState('');
  const [purchased, setPurchased] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then(response => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    return setPurchased(false);
  }, []);

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  async function makeOrder() {
    const response = await axios.post('/api/checkout', {
      name,
      city,
      postal,
      street,
      cartProducts,
    });
    if (response.data.success) {
      resetCart();
      await setPurchased(true);
      router.push('/cart');
    }
  }

  return (
    <>
      {cartProducts.length <= 0 && (
        <div className={styles.emptyCart}>
          <span>
            {purchased ? 'Thank you for your order' : 'Your cart is empty'}
          </span>
          <button onClick={() => router.push('/')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
            Back to products
          </button>
        </div>
      )}
      {cartProducts.length > 0 && (
        <>
          <div className={styles.pageContainer}>
            <div className={styles.cartProducts}>
              <header>
                <span className={styles.sectionTitle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={styles.bagIcon}
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Products
                </span>
                <button onClick={() => resetCart()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  REMOVE ALL
                </button>
              </header>
              {products.length > 0 &&
                products.map(product => (
                  <div className={styles.productContainer} key={product._id}>
                    <img alt={product.title} src={product.images[0]} />
                    <div>
                      <Link
                        href={`/product/${product._id}`}
                        className={styles.productName}
                      >
                        {product.title.length > 60
                          ? product.title.slice(0, 60) + '...'
                          : product.title}
                      </Link>
                      <div className={styles.priceQuantity}>
                        <span>
                          $
                          {cartProducts.length > 0 &&
                            (
                              cartProducts.filter(id => id === product._id)
                                .length * product.price
                            ).toFixed(2)}
                        </span>
                        <div>
                          <button
                            onClick={() => removeManyProducts(product._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className={styles.trashIcon}
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button onClick={() => removeOneProduct(product._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className={styles.arrows}
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>

                          {cartProducts.filter(id => id === product._id).length}
                          <button onClick={() => addToCart(product._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className={styles.arrows}
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.infoAndPayment}>
              <div className={styles.orderInfos}>
                <span className={styles.sectionTitle}>
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  Order info
                </span>
                <form>
                  <input
                    className={styles.infoInput}
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={e => setName(e.target.value)}
                  />
                  <input
                    className={styles.infoInput}
                    type="number"
                    name="postal"
                    placeholder="Postal Code"
                    value={postal}
                    onChange={e => setPostal(e.target.value)}
                  />
                  <input
                    className={styles.infoInput}
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  />
                  <input
                    className={styles.infoInput}
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                  />
                </form>
              </div>
              <div className={styles.paymentContainer}>
                <span className={styles.sectionTitle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Total:{' '}
                  <span className={styles.totalPrice}>
                    {' '}
                    ${total.toFixed(2)}
                  </span>
                </span>
                <button onClick={makeOrder} className={styles.confirm}>
                  Confirm order
                </button>
                <button
                  className={styles.keep}
                  onClick={() => router.push('/')}
                >
                  Keep shopping
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
