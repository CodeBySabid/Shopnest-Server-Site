import express from "express";
import { approveSeller, becomeSellerRequest, getAllUsers, getUserRole, loginUser, registerUser, saveUser, updateUserRole } from "../controllers/userController";

const router = express.Router();

// Google login
router.post("/", saveUser);
// Email registration
router.post("/register", registerUser);
// Email login varify
router.post("/login", loginUser);
router.get("/role/:email", getUserRole);
router.post("/become-seller", becomeSellerRequest);
router.get("/", getAllUsers);
router.patch("/:id/approve", approveSeller);
router.patch("/:id/role", updateUserRole);

export default router