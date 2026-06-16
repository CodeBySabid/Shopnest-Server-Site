export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  rating?: number;
  reviewCount?: number;
  sellerId: string;
  sellerName: string;
  isApproved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: "user" | "seller" | "admin";
  shopName?: string;
  shopDescription?: string;
  isApproved?: boolean;
  createdAt?: Date;
}

export interface IOrder {
  _id?: string;
  userId: string;
  items: {
    productId: string;
    sellerId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  stripePaymentId?: string;
  createdAt?: Date;
}

export interface IReview {
  _id?: string;
  productId: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}