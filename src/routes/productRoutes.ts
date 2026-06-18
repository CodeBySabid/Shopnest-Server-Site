import express from "express";
import {
  getAllProducts,
} from "../controllers/productController";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);

// Seller routes

export default router;