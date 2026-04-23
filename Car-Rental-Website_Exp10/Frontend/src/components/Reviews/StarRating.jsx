import React from "react";

const StarRating = ({ rating, setRating }) => {
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={`cursor-pointer text-2xl ${
              starValue <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => setRating && setRating(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
