import { useEffect, useState } from "react";
import api from "../../utils/api";
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi2";

const LOCATION_COORDS = {
  "Sector 17, Chandigarh": { lat: 30.7333, lng: 76.7794 },
  "Sector 47, Chandigarh": { lat: 30.699, lng: 76.758 },
  Mohali: { lat: 30.7046, lng: 76.7179 },
  Kharar: { lat: 30.749, lng: 76.6578 },
  Airport: { lat: 30.6735, lng: 76.7885 },
};

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    pricePerDay: "",
    description: "",
    type: "Sedan",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 4,
    imageUrl: "",
    features: "",
    locationAddress: "Sector 17, Chandigarh",
    locationLat: LOCATION_COORDS["Sector 17, Chandigarh"].lat,
    locationLng: LOCATION_COORDS["Sector 17, Chandigarh"].lng,
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchCars = async () => {
    try {
      const { data } = await api.get("/cars");
      setCars(data);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this car?")) {
      try {
        await api.delete(`/cars/${id}`);
        fetchCars();
      } catch {
        alert("Failed to delete car");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (
        key === "locationAddress" ||
        key === "locationLat" ||
        key === "locationLng"
      ) {
        return;
      }
      if (key === "features") {
        const featuresArray = formData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f);
        data.append("features", JSON.stringify(featuresArray));
      } else {
        data.append(key, formData[key]);
      }
    });

    data.append(
      "location",
      JSON.stringify({
        type: "Point",
        coordinates: [
          Number(formData.locationLng),
          Number(formData.locationLat),
        ],
        address: formData.locationAddress,
      })
    );

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      if (currentCar) {
        await api.put(`/cars/${currentCar._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/cars", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setShowForm(false);
      fetchCars();
      resetForm();
    } catch (err) {
      console.error(err);
      alert(
        "Failed to save car: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const resetForm = () => {
    setFormData({
      make: "",
      model: "",
      year: "",
      pricePerDay: "",
      description: "",
      type: "Sedan",
      transmission: "Automatic",
      fuelType: "Petrol",
      seats: 4,
      imageUrl: "",
      features: "",
      locationAddress: "Sector 17, Chandigarh",
      locationLat: LOCATION_COORDS["Sector 17, Chandigarh"].lat,
      locationLng: LOCATION_COORDS["Sector 17, Chandigarh"].lng,
    });
    setImageFile(null);
    setCurrentCar(null);
    setIsEditing(false);
  };

  const handleEdit = (car) => {
    const carLat = car.location?.coordinates?.[1];
    const carLng = car.location?.coordinates?.[0];
    const carAddress = car.location?.address || "Sector 17, Chandigarh";

    setCurrentCar(car);
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year,
      pricePerDay: car.pricePerDay,
      description: car.description,
      type: car.type,
      transmission: car.transmission,
      fuelType: car.fuelType,
      seats: car.seats,
      imageUrl: car.imageUrl,
      features: car.features ? car.features.join(", ") : "",
      locationAddress: carAddress,
      locationLat:
        typeof carLat === "number"
          ? carLat
          : LOCATION_COORDS[carAddress]?.lat ??
            LOCATION_COORDS["Sector 17, Chandigarh"].lat,
      locationLng:
        typeof carLng === "number"
          ? carLng
          : LOCATION_COORDS[carAddress]?.lng ??
            LOCATION_COORDS["Sector 17, Chandigarh"].lng,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Cars</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-200"
        >
          <HiPlus className="w-5 h-5" /> Add New Car
        </button>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 flex flex-col"
          >
            <img
              src={car.imageUrl}
              alt={car.model}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                {car.make} {car.model}
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                {car.year} • {car.transmission} • {car.fuelType}
              </p>
              <p className="text-white font-bold mb-4">
                ₹{car.pricePerDay.toLocaleString()}/day
              </p>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleEdit(car)}
                  className="flex-1 bg-blue-900 text-blue-100 py-2 rounded flex justify-center items-center hover:bg-blue-800"
                >
                  <HiPencil className="w-4 h-4 mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="flex-1 bg-red-900 text-red-100 py-2 rounded flex justify-center items-center hover:bg-red-800"
                >
                  <HiTrash className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal/Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">
              {isEditing ? "Edit Car" : "Add New Car"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Make (e.g. Toyota)"
                  value={formData.make}
                  onChange={(e) =>
                    setFormData({ ...formData, make: e.target.value })
                  }
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Model (e.g. Camry)"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                  required
                />
                <input
                  type="number"
                  placeholder="Year"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                  required
                />
                <input
                  type="number"
                  placeholder="Price Per Day"
                  value={formData.pricePerDay}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerDay: e.target.value })
                  }
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                  required
                />
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Sports">Sports</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Electric">Electric</option>
                </select>
                <select
                  value={formData.transmission}
                  onChange={(e) =>
                    setFormData({ ...formData, transmission: e.target.value })
                  }
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
                <select
                  value={formData.fuelType}
                  onChange={(e) =>
                    setFormData({ ...formData, fuelType: e.target.value })
                  }
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <input
                  type="number"
                  placeholder="Seats"
                  value={formData.seats}
                  onChange={(e) =>
                    setFormData({ ...formData, seats: e.target.value })
                  }
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                  required
                />
                <select
                  value={formData.locationAddress}
                  onChange={(e) => {
                    const address = e.target.value;
                    const coords = LOCATION_COORDS[address];
                    setFormData({
                      ...formData,
                      locationAddress: address,
                      locationLat: coords ? coords.lat : formData.locationLat,
                      locationLng: coords ? coords.lng : formData.locationLng,
                    });
                  }}
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                >
                  {Object.keys(LOCATION_COORDS).map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Warehouse Latitude"
                  value={formData.locationLat}
                  onChange={(e) =>
                    setFormData({ ...formData, locationLat: e.target.value })
                  }
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                  required
                />
                <input
                  type="number"
                  placeholder="Warehouse Longitude"
                  value={formData.locationLng}
                  onChange={(e) =>
                    setFormData({ ...formData, locationLng: e.target.value })
                  }
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                  required
                />
              </div>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full h-24"
                required
              />

              <input
                type="text"
                placeholder="Features (comma separated, e.g. GPS, Bluetooth)"
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
                className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
              />

              <div>
                <label className="block text-gray-400 mb-1">Car Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="bg-gray-800 p-3 rounded border border-gray-600 text-white w-full"
                />
                {formData.imageUrl && !imageFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Current image: {formData.imageUrl}
                  </p>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-300 flex-1"
                >
                  {isEditing ? "Update Car" : "Add Car"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-800 text-white px-6 py-3 rounded font-bold hover:bg-gray-700 flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCars;
