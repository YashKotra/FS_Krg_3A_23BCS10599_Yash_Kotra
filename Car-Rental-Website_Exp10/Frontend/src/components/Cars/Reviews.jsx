import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useSelector } from "react-redux";

const Reviews = ({ carId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get(`/reviews/${carId}`);
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    if (carId) {
      fetchReviews();
    }
  }, [carId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reviews", {
        rating,
        comment,
        carId,
      });
      setComment("");
      setRating(5);
      setError("");
      // Refresh reviews
      const { data } = await api.get(`/reviews/${carId}`);
      setReviews(data);
      alert("Review submitted!");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="bg-black text-white py-12 px-4">
      <h2 className="text-2xl font-semibold text-center mb-8">
        What Our Customers Say
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-400">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 border border-gray-700 rounded">
              <div className="flex justify-between mb-2">
                <span className="font-bold">{review.user?.name}</span>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <p className="text-gray-300 italic">"{review.comment}"</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {userInfo ? (
        <div className="max-w-md mx-auto bg-gray-900 p-6 rounded">
          <h3 className="text-xl font-bold mb-4">Write a Review</h3>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-2 bg-gray-800 text-white rounded"
              >
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 bg-gray-800 text-white rounded"
                rows="3"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
            >
              Submit Review
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center text-gray-400">
          Please <a href="/login" className="text-red-500 underline">login</a> to write a review.
        </p>
      )}
    </div>
  );
};

export default Reviews;
