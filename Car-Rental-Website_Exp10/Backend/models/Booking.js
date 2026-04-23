import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Car',
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'reserved', 'queued', 'expired'],
    default: 'pending',
  },
  expiresAt: { type: Date },
  queuePosition: { type: Number },
  pickupLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
    address: { type: String }
  },
  paymentId: { type: String },
  paymentStatus: { type: String, default: 'pending' },
  pickupToken: { type: String },
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
