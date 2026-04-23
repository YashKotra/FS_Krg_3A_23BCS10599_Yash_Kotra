import Review from "../models/Review.js";
import Car from "../models/Car.js";

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
export const addReview = async (req, res) => {
  const { rating, comment, carId } = req.body;

  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    const alreadyReviewed = await Review.findOne({
      car: carId,
      user: req.user._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Car already reviewed" });
    }

    const review = await Review.create({
      car: carId,
      user: req.user._id,
      rating: Number(rating),
      comment,
    });

    // Update Car Rating
    const reviews = await Review.find({ car: carId });
    car.numReviews = reviews.length;
    car.averageRating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await car.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get reviews for a car
// @route   GET /api/reviews/:carId
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ car: req.params.carId }).populate(
      "user",
      "name"
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
