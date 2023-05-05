import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import styles from '../styles/Home.module.scss';
import ProductCard from '@/components/ProductCard';
import FeaturedBanner from '@/components/FeaturedBanner';

export default function Home({ products, featured }) {
  return (
    <>
      <FeaturedBanner featured={featured} />
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
  const featured = await Product.findById('6451042aa0705739ccceb7f8');
  const products = await Product.find({}, null, {
    sort: { _id: 1 },
    limit: 12,
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      featured: JSON.parse(JSON.stringify(featured)),
    },
  };
}
