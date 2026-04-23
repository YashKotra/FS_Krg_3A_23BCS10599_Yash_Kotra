import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../utils/api";

const MyBookings = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get("/bookings/mybookings");
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };
    if (userInfo) fetchBookings();
    else setLoading(false);
  }, [userInfo]);

  if (loading)
    return <div className="p-10 text-center text-white">Loading...</div>;

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        {bookings.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-400">You have no bookings yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="p-4 bg-gray-900 rounded border border-gray-700 flex flex-col md:flex-row gap-4"
              >
                {booking.car && (
                  <img
                    src={booking.car.imageUrl}
                    alt={booking.car.make}
                    className="w-full md:w-48 h-32 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold mb-1">
                        {booking.car
                          ? `${booking.car.make} ${booking.car.model}`
                          : "Unknown Car"}
                      </h2>
                      <p className="text-gray-400 text-sm mb-2">
                        Booking ID: {booking._id}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold capitalize ${
                        booking.status === "confirmed"
                          ? "bg-green-900 text-green-200"
                          : booking.status === "pending"
                          ? "bg-yellow-900 text-yellow-200"
                          : "bg-red-900 text-red-200"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-300">
                    <div>
                      <p className="text-gray-500">From</p>
                      <p>{new Date(booking.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">To</p>
                      <p>{new Date(booking.endDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Price</p>
                      <p className="text-white font-bold">
                        ₹{booking.totalPrice.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Pickup</p>
                      <p>{booking.pickupLocation?.address || "N/A"}</p>
                    </div>
                    {booking.pickupToken && (
                      <div className="col-span-2 mt-2 p-2 bg-green-900 rounded border border-green-700 text-center">
                        <p className="text-green-300 text-xs uppercase tracking-wider">Pickup Token</p>
                        <p className="text-white text-xl font-mono font-bold tracking-widest">{booking.pickupToken}</p>
                        <p className="text-green-300 text-xs">Show this token during car pickup</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
