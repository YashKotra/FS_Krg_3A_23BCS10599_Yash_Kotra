import { Link } from "react-router-dom";

const CarGrid = ({ products = [] }) => {
  if (!Array.isArray(products)) {
    console.error("CarGrid received non-array products:", products);
    return (
      <p className="text-white text-center col-span-full">
        Error loading cars. Please try again later.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.length > 0 ? (
        products.map((product) => (
          <Link key={product._id} to={`/car/${product._id}`} className="block">
            <div className="relative p-4 border-4 border-white rounded-xl hover:shadow-lg transition">
              {/* Badges */}
              {product.isBestSeller && (
                <span className="absolute top-6 left-6 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                  Best Seller
                </span>
              )}
              {product.averageRating >= 4.5 && !product.isBestSeller && (
                <span className="absolute top-6 left-6 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                  Top Rated
                </span>
              )}

              <div className="w-full h-96 mb-4">
                <img
                  src={product.imageUrl}
                  alt={product.make + " " + product.model}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold text-white">
                {product.make} {product.model}
              </h2>

              {/* Reviews */}
              <div className="flex items-center my-1">
                <span className="text-yellow-400 text-sm mr-1">
                  {"★".repeat(Math.round(product.averageRating || 0))}
                  {"☆".repeat(5 - Math.round(product.averageRating || 0))}
                </span>
                <span className="text-gray-400 text-xs">
                  ({product.numReviews || 0})
                </span>
              </div>

              <p className="text-white">
                ₹{product.pricePerDay.toLocaleString()}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-white text-center col-span-full">
          No cars found for this category.
        </p>
      )}
    </div>
  );
};

export default CarGrid;
