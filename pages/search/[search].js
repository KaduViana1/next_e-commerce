import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import styles from '@/styles/Search.module.scss';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export default function searchPage({ searchResults }) {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);

  return (
    <div className={styles.pageContainer}>
      {searchResults.length === 0 ? (
        <>
          <span>No Results found</span>
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
        </>
      ) : (
        searchResults.length > 0 &&
        searchResults.map(result => (
          <div
            onClick={() => router.push(`/product/${result._id}`)}
            key={result._id}
            className={styles.productContainer}
          >
            <img src={result.images[0]} alt={result.title} />
            <div className={styles.infos}>
              <h3 className={styles.mobileH3}>
                {result.title.length > 35
                  ? result.title.slice(0, 23) + '...'
                  : result.title}
              </h3>
              <h3 className={styles.desktopH3}>{result.title}</h3>
              <p className={styles.mobileP}>
                {result.description.slice(0, 50) + '...'}
              </p>
              <p className={styles.desktopP}>
                {result.description.slice(0, 470) + '...'}
              </p>
              <div className={styles.priceAndButton}>
                <span>${result.price}</span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    addToCart(result._id);
                  }}
                >
                  {' '}
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
          </div>
        ))
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  let search = context.query.s;
  const searchResults = await Product.find({ $text: { $search: search } });

  return {
    props: {
      searchResults: JSON.parse(JSON.stringify(searchResults)),
    },
  };
}
