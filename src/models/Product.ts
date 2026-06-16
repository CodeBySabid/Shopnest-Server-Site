import mongoose, { Schema, type Document } from "mongoose";
import type { IProduct } from "../types";

export interface IProductDocument extends IProduct, Document { }

const ProductSchema = new Schema<IProductDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        originalPrice: {
            type: Number,
            required: true,
            min: 0
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        },
        reviewCount: {
            type: Number,
            default: 0
        },
        // Seller info
        sellerId: {
            type: String,
            required: true
        },
        sellerName: {
            type: String,
            required: true
        },
        isApproved: {
            type: Boolean,
            default: false
        },
    },
    {timestamps: true}
)

export default mongoose.model<IProductDocument>("Product", ProductSchema);