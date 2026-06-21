export interface IProduct {
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
  name: string;
  email: string;
  password?: string;
  image?: string;
  phone?: string;
  address?: string;
  role: "user" | "seller" | "admin";
  shopName?: string;
  shopDescription?: string;
  isApproved?: boolean;
  provider?: string;
  createdAt?: Date;
}

export interface IOrder {
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
  productId: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}