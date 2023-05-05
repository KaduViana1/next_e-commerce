import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import styles from '../../styles/Product.module.scss';
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';

export default function ProductPage({ product }) {
  const [displayedImage, setDislplayedImage] = useState(product.images[0]);
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.container}>
        <img
          className={styles.displayedImage}
          src={displayedImage}
          alt="Product image"
        />
        <div className={styles.imageSelector}>
          {product.images.map(img => (
            <button onClick={() => setDislplayedImage(img)}>
              <img src={img} alt="Product image" />
            </button>
          ))}
        </div>
        <div className={styles.infosContainer}>
          <div className={styles.descriptionContainer}>
            <span>${product.price}</span>
            <p>{product.description}</p>
          </div>
          <button
            onClick={() => addToCart(product._id)}
            className={styles.addButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const product = await Product.findById(context.query.id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
