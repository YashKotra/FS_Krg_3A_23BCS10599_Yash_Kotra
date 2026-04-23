import crypto from "crypto";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { carId, startDate, endDate, totalPrice, pickupLocation } = req.body;

  if (!carId || !startDate || !endDate) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  const car = await Car.findById(carId);

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  // Check for date overlaps
  const start = new Date(startDate);
  const end = new Date(endDate);

  const overlappingBookings = await Booking.find({
    car: carId,
    status: { $nin: ["cancelled", "expired", "completed"] },
    startDate: { $lt: end },
    endDate: { $gt: start },
  }).sort({ createdAt: 1 });

  let bookingStatus = "reserved";
  let expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
  let queuePosition = 0;

  if (overlappingBookings.length > 0) {
    const hasConfirmed = overlappingBookings.some((b) => b.status === "confirmed");
    if (hasConfirmed) {
      return res.status(400).json({ message: "Car is already booked and paid for these dates." });
    }

    bookingStatus = "queued";
    expiresAt = undefined;
    queuePosition = overlappingBookings.length;
  }

  const booking = new Booking({
    user: req.user._id,
    car: carId,
    startDate,
    endDate,
    totalPrice,
    pickupLocation,
    status: bookingStatus,
    expiresAt,
    queuePosition,
  });

  try {
    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400).json({ message: "Booking failed", error: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email")
      .populate("car");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("car");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user", "id name")
      .populate("car");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get booked dates for a specific car
// @route   GET /api/bookings/car/:carId/dates
// @access  Public
const getBookedDatesByCar = async (req, res) => {
  try {
    const bookings = await Booking.find({
      car: req.params.carId,
      status: { $ne: "cancelled" },
    }).select("startDate endDate");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get queue status for a booking
// @route   GET /api/bookings/:id/queue-status
// @access  Private
const getQueueStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "queued") {
      return res.json({
        status: booking.status,
        queuePosition: booking.queuePosition,
        expiresAt: booking.expiresAt,
      });
    }

    // Lazy queue evaluation
    const overlappingBookings = await Booking.find({
      car: booking.car,
      status: { $nin: ["cancelled", "completed"] },
      startDate: { $lt: booking.endDate },
      endDate: { $gt: booking.startDate },
      createdAt: { $lte: booking.createdAt },
    }).sort({ createdAt: 1 });

    let activeBookings = 0;

    for (let b of overlappingBookings) {
      if (b._id.toString() === booking._id.toString()) {
        break; // Reached our own booking
      }

      if (b.status === "reserved" && b.expiresAt && b.expiresAt < new Date()) {
        b.status = "expired";
        await b.save();
      } else if (b.status !== "expired") {
        activeBookings++;
      }
    }

    if (activeBookings === 0) {
      booking.status = "reserved";
      booking.expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
      booking.queuePosition = 0;
      await booking.save();
    } else {
      booking.queuePosition = activeBookings;
      await booking.save();
    }

    res.json({
      status: booking.status,
      queuePosition: booking.queuePosition,
      expiresAt: booking.expiresAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  createBooking,
  getBookingById,
  getMyBookings,
  getBookings,
  updateBookingStatus,
  getBookedDatesByCar,
  getQueueStatus,
};
