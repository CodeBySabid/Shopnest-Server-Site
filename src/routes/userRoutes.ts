import express from "express";
import { approveSeller, becomeSellerRequest, getAllUsers, getUserRole, saveUser, updateUserRole } from "../controllers/userController";

const router = express.Router();

router.post("/", saveUser);
router.get("/role/:email", getUserRole);
router.post("/become-seller", becomeSellerRequest);
router.get("/", getAllUsers);
router.patch("/:id/approve", approveSeller);
router.patch("/:id/role", updateUserRole);

export default router