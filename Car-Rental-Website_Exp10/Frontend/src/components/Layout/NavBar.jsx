import React, { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineChatBubbleLeftRight,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const NavBar = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNavDrawer = () => {
    setNavDrawerOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="container mx-auto flex px-6 py-6 justify-between items-center ">
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link
          to="/"
          className="text-sm font-medium uppercase text-white hover:text-gray-400"
        >
          Home
        </Link>
        <Link
          to="/cars"
          className="text-sm font-medium uppercase text-white hover:text-gray-400"
        >
          All Cars
        </Link>
        <Link
          to="/cars/sports"
          className="text-sm font-medium uppercase text-white hover:text-gray-400"
        >
          Sports
        </Link>
        <Link
          to="/cars/suv"
          className="text-sm font-medium uppercase text-white hover:text-gray-400"
        >
          SUV
        </Link>
        <Link
          to="/cars/sedan"
          className="text-sm font-medium uppercase text-white hover:text-gray-400"
        >
          Sedan
        </Link>
        <Link
          to="/my-bookings"
          className="text-sm font-medium uppercase text-white hover:text-gray-400"
        >
          My Bookings
        </Link>
        <Link
          to="/about"
          className="text-sm font-medium uppercase text-white hover:text-gray-400"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-sm font-medium uppercase text-white hover:text-gray-400"
        >
          Contact
        </Link>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        {/* Profile - only show if logged in */}
        {userInfo && (
          <Link to="/profile" className="text-white hover:text-gray-400">
            <HiOutlineUser className="h-6 w-6" />
          </Link>
        )}

        {/* Chat Icon */}
        <Link to="/chat" className="text-white hover:text-gray-400">
          <HiOutlineChatBubbleLeftRight className="h-6 w-6" />
        </Link>

        {/* Authentication Buttons */}
        {userInfo ? (
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-400 text-sm font-medium"
          >
            Logout
          </button>
        ) : (
          <div className="flex space-x-2">
            <Link
              to="/login"
              className="text-white hover:text-gray-400 text-sm font-medium"
            >
              Login
            </Link>
            <span className="text-white">|</span>
            <Link
              to="/signup"
              className="text-white hover:text-gray-400 text-sm font-medium"
            >
              Signup
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleNavDrawer}>
          <HiBars3BottomRight className="h-6 w-6 text-white hover:text-gray-400" />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Home
            </Link>
            <Link
              to="/cars"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Cars
            </Link>
            <Link
              to="/about"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Contact
            </Link>
            <Link
              to="/chat"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Chat
            </Link>
            {userInfo && (
              <Link
                to="/profile"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black"
              >
                Profile
              </Link>
            )}
            {userInfo && (
              <Link
                to="/my-bookings"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black"
              >
                My Bookings
              </Link>
            )}
            {!userInfo ? (
              <>
                <Link
                  to="/login"
                  onClick={toggleNavDrawer}
                  className="block text-gray-600 hover:text-black"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleNavDrawer}
                  className="block text-gray-600 hover:text-black"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  toggleNavDrawer();
                }}
                className="block text-gray-600 hover:text-black text-left w-full"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
