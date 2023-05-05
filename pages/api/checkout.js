import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name,
    email,
    city,
    postal,
    street,
    cartProducts: products,
  } = req.body;
  await mongooseConnect();
  const productsIds = products;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let orderItens = [];
  for (const productId of uniqueIds) {
    const info = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && info) {
      orderItens.push({
        product_info: {
          product_name: info.title,
          quantity: quantity,
          price: quantity * info.price,
        },
      });
    }
  }
  const orderDocument = await Order.create({
    orderItens,
    name,
    email,
    city,
    postal,
    street,
  });

  res.json({
    success: `Order successfully created with ID:${orderDocument._id.toString()}`,
  });
}
