import mongoose, { Schema, Document } from "mongoose";
import type { IUser } from "../types";


export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: {
      type: String,
    },
    image: { 
      type: String 
    },
    role: { 
      type: String, 
      enum: ["user", "seller", "admin"], 
      default: "user"
    },

    shopName: { 
      type: String 
    },
    shopDescription: { 
      type: String 
    },
    isApproved: { 
      type: Boolean, 
      default: false
    },
    provider: {
      type: String,
      default: "credentials",
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUserDocument>("User", UserSchema);