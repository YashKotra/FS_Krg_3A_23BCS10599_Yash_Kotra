import express from "express";
import {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect,admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/users", protect, admin, getUsers);
router.delete("/users/:id", protect, admin, deleteUser);

export default router;
