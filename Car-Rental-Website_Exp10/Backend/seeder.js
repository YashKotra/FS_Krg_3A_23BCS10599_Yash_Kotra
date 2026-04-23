import Car from "./models/Car.js";
import User from "./models/User.js";
import Booking from "./models/Booking.js";
import Review from "./models/Review.js";
import Contact from "./models/Contact.js";
import cars from "./data/cars.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const generateRandomReviews = (carId, userId) => {
  const reviews = [];
  const reviewTexts = [
    "Amazing car! Smooth drive and great mileage.",
    "Good experience, but the pickup process was a bit slow.",
    "Loved the car. It was clean and well-maintained.",
    "Decent car for the price. Would rent again.",
    "Excellent service and a fantastic vehicle.",
    "The car had a few scratches, but it ran perfectly.",
    "Best rental experience I've had so far!",
    "Comfortable seats and good AC.",
    "Powerful engine, really enjoyed driving it.",
    "Clean, fast, and reliable. Highly recommended.",
  ];

  const numReviews = Math.floor(Math.random() * 6); // 0 to 5 reviews

  for (let i = 0; i < numReviews; i++) {
    const rating = Math.floor(Math.random() * 3) + 3; // 3 to 5 stars
    reviews.push({
      car: carId,
      user: userId,
      rating,
      comment: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
    });
  }

  return reviews;
};

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    // Clear existing data
    await Booking.deleteMany();
    await Review.deleteMany();
    await Contact.deleteMany();
    await Car.deleteMany();
    await User.deleteMany();

    // Create Admin User
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456", // Will be hashed by pre-save hook
      isAdmin: true,
    });

    // Create a regular user for reviews
    const regularUser = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      isAdmin: false,
    });

    console.log("Users created.");

    // Prepare Cars
    const carsWithUser = cars.map((car) => ({
      ...car,
      user: adminUser._id,
      averageRating: 0,
      numReviews: 0,
      isBestSeller: Math.random() < 0.2, // 20% chance to be best seller
    }));

    // Insert Cars
    const createdCars = await Car.insertMany(carsWithUser);
    console.log(`${createdCars.length} cars imported.`);

    // Generate Reviews and Update Cars
    for (const car of createdCars) {
      const reviews = generateRandomReviews(car._id, regularUser._id);

      if (reviews.length > 0) {
        await Review.insertMany(reviews);

        const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0);
        car.averageRating = totalRating / reviews.length;
        car.numReviews = reviews.length;
        await car.save();
      }
    }

    console.log("Reviews generated and cars updated.");

    process.exit(0);
  } catch (error) {
    console.error("Seeder error:", error.message);
    process.exit(1);
  }
};

seedData();
