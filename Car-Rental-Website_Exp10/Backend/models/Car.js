import mongoose from "mongoose";

const carSchema = mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    available: { type: Boolean, default: true },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual"],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },
    seats: { type: Number, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: { type: String },
    },
    description: { type: String },
    features: [String],
    type: { type: String, required: true },
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isBestSeller: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

carSchema.index({ location: "2dsphere" });

const Car = mongoose.model("Car", carSchema);

export default Car;
