import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  HiChartPie,
  HiUsers,
  HiCalendar,
  HiTruck,
  HiArrowLeft,
} from "react-icons/hi2";
import { HiLogout } from "react-icons/hi";
import { logout } from "../../redux/authSlice";

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      navigate("/");
    } else if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  if (!userInfo || !userInfo.isAdmin) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black border-r border-gray-800 p-6 hidden md:block flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-white font-medium text-sm">{userInfo.name}</p>
            <p className="text-gray-400 text-xs">{userInfo.email}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          <Link
            to="/admin"
            className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded hover:bg-gray-800 transition-colors"
          >
            <HiChartPie className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/bookings"
            className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded hover:bg-gray-800 transition-colors"
          >
            <HiCalendar className="w-5 h-5" />
            <span>Bookings</span>
          </Link>
          <Link
            to="/admin/cars"
            className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded hover:bg-gray-800 transition-colors"
          >
            <HiTruck className="w-5 h-5" />
            <span>Cars</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded hover:bg-gray-800 transition-colors"
          >
            <HiUsers className="w-6 h-6" />
            <span>Users</span>
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-gray-800">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-400 hover:text-white p-2 rounded hover:bg-gray-800 transition-colors mb-2"
          >
            <HiArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-400 hover:text-white p-2 rounded hover:bg-gray-800 transition-colors w-full"
          >
            <HiLogout className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Bar */}
        <div className="bg-black border-b border-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white">Car Rental Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              Welcome, {userInfo.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
