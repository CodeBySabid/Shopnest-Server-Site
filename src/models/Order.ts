import mongoose, { Schema, Document } from "mongoose";
import { IOrder } from "../types";

export interface IOrderDocument extends IOrder, Document {}

const OrderSchema = new Schema<IOrderDocument>(
  {
    userId: { 
      type: String, 
      required: true 
    },
    items: [
      {
        productId: { type: String, required: true },
        sellerId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    totalPrice: { 
      type: Number, 
      required: true 
    },
    shippingAddress: {
      type: String, 
      required: true
    },
    phone: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    stripeSessionId: {
      type: String,
    },
    stripePaymentId: { 
      type: String 
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrderDocument>("Order", OrderSchema);