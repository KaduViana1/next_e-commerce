import mongoose, { model, Schema, models } from 'mongoose';

const OrderSchema = new Schema(
  {
    orderItens: Object,
    name: String,
    city: String,
    postal: Number,
    street: String,
  },
  { timestamps: true }
);

export const Order = models.Order || model('Order', OrderSchema);
