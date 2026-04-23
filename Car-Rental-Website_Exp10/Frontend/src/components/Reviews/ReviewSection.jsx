import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";
import StarRating from "./StarRating";

const ReviewSection = ({ carId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get(`/reviews/${carId}`);
        setReviews(data);
      } catch (error) {
        setError("Failed to fetch reviews.");
      }
    };
    fetchReviews();
  }, [carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      setError("Please provide a rating and a comment.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/reviews", { carId, rating, comment });
      const { data } = await api.get(`/reviews/${carId}`);
      setReviews(data);
      setRating(0);
      setComment("");
    } catch (error) {
      setError("Failed to submit review.");
    }
    setLoading(false);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {userInfo && (
        <form onSubmit={handleSubmit} className="mb-8">
          <h3 className="text-xl font-bold mb-2">Write a Review</h3>
          <div className="mb-4">
            <label className="block mb-2">Rating</label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
      <div>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border-b pb-4 mb-4">
              <div className="flex items-center mb-2">
                <p className="font-bold mr-2">{review.user.name}</p>
                <StarRating rating={review.rating} />
              </div>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
