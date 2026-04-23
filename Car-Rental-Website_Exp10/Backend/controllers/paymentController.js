import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";

// dotenv.config() MUST NOT be here

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: "bookingId is required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (String(booking.user) !== String(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (booking.paymentStatus === "completed") {
      return res.status(400).json({ message: "Booking already paid" });
    }

    if (typeof booking.totalPrice !== "number" || booking.totalPrice <= 0) {
      return res.status(400).json({ message: "Invalid booking amount" });
    }

    const options = {
      amount: Math.round(booking.totalPrice * 100),
      currency: "INR",
      receipt: `receipt_${bookingId}`,
    };

    const order = await razorpay.orders.create(options);

    booking.paymentStatus = "created";
    await booking.save();

    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Payment order creation failed" });
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !bookingId
    ) {
      return res.status(400).json({ message: "Missing payment fields" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      const booking = await Booking.findById(bookingId);
      if (
        booking &&
        (String(booking.user) === String(req.user._id) || req.user.isAdmin)
      ) {
        booking.paymentStatus = "failed";
        await booking.save();
      }
      return res.status(400).json({ message: "Invalid signature" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentId = razorpay_payment_id;
    booking.paymentStatus = "completed";
    booking.status = "confirmed"; // Auto-confirm after payment

    // Generate Pickup Token (6 chars alphanumeric)
    booking.pickupToken = crypto.randomBytes(3).toString("hex").toUpperCase();

    await booking.save();

    res.json({
      message: "Payment verified successfully",
      pickupToken: booking.pickupToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Payment verification failed" });
  }
};

// @desc    Get Razorpay Key ID
// @route   GET /api/payment/key
// @access  Public
const getRazorpayKey = (req, res) => {
  return res.json({ key: process.env.RAZORPAY_KEY_ID });
};

export { createOrder, verifyPayment, getRazorpayKey };
