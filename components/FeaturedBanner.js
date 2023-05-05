import styles from '../styles/Featured.module.scss';
import SeriesS from '../assets/series_S.jpg';
import SeriesX from '../assets/series_X.jpg';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { useRouter } from 'next/router';

function FeaturedBanner() {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Image src={SeriesS} width={1000} height={1000} alt="Xbox Series S" />
          <div className={styles.seriesS}>
            <button onClick={() => addToCart('6451053ea0705739ccceb81e')}>
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
            <button
              onClick={() => router.push('/product/6451053ea0705739ccceb81e')}
            >
              Go to product
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <Image src={SeriesX} width={1000} height={1000} alt="Xbox Series X" />
          <div className={styles.seriesX}>
            <button onClick={() => addToCart('6451042aa0705739ccceb7f8')}>
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
            <button
              onClick={() => router.push('/product/6451042aa0705739ccceb7f8')}
            >
              Go to product
            </button>
          </div>
        </div>
      </div>
      <div className={styles.containerMobile}>
        <div className={styles.left}>
          <Image
            onClick={() => router.push('/product/6451053ea0705739ccceb81e')}
            src={SeriesS}
            width={1000}
            height={1000}
            alt="Xbox Series S"
          />
        </div>
        <div className={styles.right}>
          <Image
            onClick={() => router.push('/product/6451042aa0705739ccceb7f8')}
            src={SeriesX}
            width={1000}
            height={1000}
            alt="Xbox Series X"
          />
        </div>
      </div>
    </>
  );
}

export default FeaturedBanner;
