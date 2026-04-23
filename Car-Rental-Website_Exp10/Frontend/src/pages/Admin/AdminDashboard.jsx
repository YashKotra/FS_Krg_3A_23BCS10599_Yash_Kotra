import { useEffect, useState } from "react";
import api from "../../utils/api";
import { HiChartPie, HiUsers, HiCalendar, HiTruck, HiCurrencyRupee } from "react-icons/hi2";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentBookings: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, bookingsRes, usersRes] = await Promise.all([
          api.get("/cars"),
          api.get("/bookings"),
          api.get("/auth/users")
        ]);

        const bookings = bookingsRes.data;
        const totalRevenue = bookings.reduce((acc, booking) => {
            return booking.status === 'completed' || booking.status === 'confirmed' ? acc + booking.totalPrice : acc;
        }, 0);

        setStats({
          totalCars: carsRes.data.length,
          totalBookings: bookings.length,
          totalUsers: usersRes.data.length,
          totalRevenue,
          recentBookings: bookings.slice(0, 5)
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-green-900 rounded text-green-200">
              <HiCurrencyRupee className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Total Bookings</p>
              <h3 className="text-2xl font-bold text-white">{stats.totalBookings}</h3>
            </div>
            <div className="p-2 bg-blue-900 rounded text-blue-200">
              <HiCalendar className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Total Cars</p>
              <h3 className="text-2xl font-bold text-white">{stats.totalCars}</h3>
            </div>
            <div className="p-2 bg-purple-900 rounded text-purple-200">
              <HiTruck className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-white">{stats.totalUsers}</h3>
            </div>
            <div className="p-2 bg-orange-900 rounded text-orange-200">
              <HiUsers className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="pb-3">Car</th>
                <th className="pb-3">User</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {stats.recentBookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="py-3 text-white">{booking.car ? booking.car.make : 'Unknown'}</td>
                  <td className="py-3 text-gray-300">{booking.user ? booking.user.name : 'Unknown'}</td>
                  <td className="py-3 text-gray-300">{new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 text-white">₹{booking.totalPrice.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                         booking.status === 'confirmed' ? 'bg-green-900 text-green-200' : 
                         booking.status === 'pending' ? 'bg-yellow-900 text-yellow-200' : 
                         'bg-red-900 text-red-200'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
