import express from "express";
import {
  createOrder,
  verifyPayment,
  getRazorpayKey,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/key", getRazorpayKey);
router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);

export default router;
