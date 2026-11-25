import express from "express";
import { confirmOrder, createCheckoutSession } from "../controllers/orderController";

const router = express.Router();

router.post("/checkout", createCheckoutSession);
router.get("/confirm", confirmOrder);

export default router;