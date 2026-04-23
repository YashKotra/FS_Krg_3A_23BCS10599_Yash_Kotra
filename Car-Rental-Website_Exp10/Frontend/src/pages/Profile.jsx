import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateUserProfile, getUserProfile } from "../redux/authSlice";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { userInfo, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        aadhar: userInfo.aadhar || "",
        licenseNumber: userInfo.licenseNumber || "",
        licenseExpiry: userInfo.licenseExpiry
          ? userInfo.licenseExpiry.split("T")[0]
          : "",
        address: {
          street: userInfo.address?.street || "",
          city: userInfo.address?.city || "",
          state: userInfo.address?.state || "",
          postalCode: userInfo.address?.postalCode || "",
        },
        profilePic: userInfo.profilePic || "",
      });
    }
  }, [userInfo]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateUserProfile(formData));
    if (updateUserProfile.fulfilled.match(result)) {
      setIsEditing(false);
    }
  };

  if (!userInfo) {
    return (
      <div className="p-10 text-white text-center">
        Please log in to view profile.
      </div>
    );
  }

  const displayData = {
    ...userInfo,
    ...formData,
    profilePic:
      formData.profilePic ||
      "https://images.unsplash.com/photo-1603415526960-f7e0328d7585?auto=format&fit=crop&q=80&w=400",
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto bg-black p-8 rounded-lg text-white border border-gray-800 shadow-lg">
        {error && (
          <div className="mb-4 p-3 bg-red-600 rounded-lg text-white">
            {error}
          </div>
        )}

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-10">
          <div className="relative">
            <img
              src={displayData.profilePic}
              alt={displayData.name}
              className="w-32 h-32 rounded-full border-4 border-white mb-6 md:mb-0 md:mr-8 object-cover"
            />
            {isEditing && (
              <div className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700">
                <input
                  type="url"
                  name="profilePic"
                  value={formData.profilePic || ""}
                  onChange={handleChange}
                  placeholder="Profile Picture URL"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                📷
              </div>
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-3xl font-semibold bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-gray-400 bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white"
                />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-semibold mb-2">
                  {displayData.name}
                </h1>
                <p className="text-gray-400">{displayData.email}</p>
              </>
            )}
            <p className="text-gray-400">
              {displayData.phone || "No phone number"}
            </p>
            {userInfo.isAdmin && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded mt-2 inline-block">
                Admin
              </span>
            )}
          </div>
        </div>

        {/* Identification Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
            Identification Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400">Aadhaar Number</p>
              {isEditing ? (
                <input
                  type="text"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  className="text-white font-medium bg-gray-800 border border-gray-600 rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-white font-medium">
                  {displayData.aadhar || "Not provided"}
                </p>
              )}
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400">Driving License Number</p>
              {isEditing ? (
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="text-white font-medium bg-gray-800 border border-gray-600 rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-white font-medium">
                  {displayData.licenseNumber || "Not provided"}
                </p>
              )}
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400">License Expiry Date</p>
              {isEditing ? (
                <input
                  type="date"
                  name="licenseExpiry"
                  value={formData.licenseExpiry}
                  onChange={handleChange}
                  className="text-white font-medium bg-gray-800 border border-gray-600 rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-white font-medium">
                  {displayData.licenseExpiry
                    ? new Date(displayData.licenseExpiry).toLocaleDateString()
                    : "Not provided"}
                </p>
              )}
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400">Phone Number</p>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="text-white font-medium bg-gray-800 border border-gray-600 rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-white font-medium">
                  {displayData.phone || "Not provided"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
            Address
          </h2>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-2">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="text-white bg-gray-800 border border-gray-600 rounded px-2 py-1 w-full"
                />
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="text-white bg-gray-800 border border-gray-600 rounded px-2 py-1 w-full"
                />
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="text-white bg-gray-800 border border-gray-600 rounded px-2 py-1 w-full"
                />
                <input
                  type="text"
                  name="address.postalCode"
                  value={formData.address.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="text-white bg-gray-800 border border-gray-600 rounded px-2 py-1 w-full"
                />
              </div>
            ) : (
              <>
                <p>{displayData.address?.street || "No street address"}</p>
                <p>
                  {displayData.address?.city || "No city"},{" "}
                  {displayData.address?.state || "No state"} -{" "}
                  {displayData.address?.postalCode || "No postal code"}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6 flex-wrap">
          {isEditing ? (
            <>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 text-white py-3 px-6 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white py-3 px-6 rounded font-semibold hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white text-black py-3 px-6 rounded font-semibold hover:bg-gray-300 transition"
            >
              Edit Profile
            </button>
          )}

          {userInfo.isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="bg-red-700 text-white py-3 px-6 rounded font-semibold hover:bg-red-600 transition"
            >
              Admin Dashboard
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-gray-800 border border-gray-600 text-white py-3 px-6 rounded font-semibold hover:bg-gray-700 transition ml-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
