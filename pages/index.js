import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import styles from '../styles/Home.module.scss';
import ProductCard from '@/components/ProductCard';

export default function Home({ products }) {
  return (
    <>
      <div className={styles.productsContainer}>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: 1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
