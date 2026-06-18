import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  // updateProduct,
  // deleteProduct,
  // getSellerProducts,
  // approveProduct,
} from "../controllers/productController";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// Seller routes
router.post("/", createProduct);
router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);
// router.get("/seller/:sellerId", getSellerProducts);

// Admin routes
// router.patch("/:id/approve", approveProduct);

export default router;