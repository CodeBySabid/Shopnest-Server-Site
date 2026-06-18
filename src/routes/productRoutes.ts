import express from "express";
import { approveProduct, createProduct, deleteProduct, getAllProducts, getSellerProducts, getSingleProduct, updateProduct } from "../controllers/productController";

const router = express.Router();

// Public Routes
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// Seller Router
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/seller/:sellerId", getSellerProducts);

// Admin Route
router.patch("/:id/approve", approveProduct);

export default router;