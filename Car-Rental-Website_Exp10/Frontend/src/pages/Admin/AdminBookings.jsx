import { useEffect, useState } from "react";
import api from "../../utils/api";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/bookings");
      setBookings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    if (!window.confirm(`Are you sure you want to change status to ${status}?`))
      return;
    try {
      await api.put(`/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>
      <div className="bg-black rounded-lg overflow-x-auto border border-gray-800">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              <th className="p-4">Booking ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Car</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-900">
                <td className="p-4 text-sm text-gray-400">
                  {booking._id.substring(0, 8)}...
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-semibold">
                      {booking.user?.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.user?.email}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  {booking.car
                    ? `${booking.car.make} ${booking.car.model}`
                    : "Unknown Car"}
                </td>
                <td className="p-4 text-sm">
                  <div className="flex flex-col">
                    <span>
                      From: {new Date(booking.startDate).toLocaleDateString()}
                    </span>
                    <span>
                      To: {new Date(booking.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="p-4">₹{booking.totalPrice.toLocaleString()}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs uppercase font-bold ${
                      booking.status === "confirmed"
                        ? "bg-green-900 text-green-200"
                        : booking.status === "cancelled"
                        ? "bg-red-900 text-red-200"
                        : booking.status === "completed"
                        ? "bg-blue-900 text-blue-200"
                        : "bg-yellow-900 text-yellow-200"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-4">
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking._id, e.target.value)
                    }
                    className="bg-gray-800 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
