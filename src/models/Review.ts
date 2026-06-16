import mongoose, { Schema, Document } from "mongoose";
import { IReview } from "../types";

export interface IReviewDocument extends IReview, Document {}

const ReviewSchema = new Schema<IReviewDocument>(
  {
    productId: { 
      type: String, 
      required: true 
    },
    userId: { 
      type: String, 
      required: true 
    },
    userName: { 
      type: String, 
      required: true 
    },
    userImage: { 
      type: String 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 1,
      max: 5
    },
    comment: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true }
);

export default mongoose.model<IReviewDocument>("Review", ReviewSchema);