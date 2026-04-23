import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import CarFilterSidebar from "../components/Cars/CarFilterSideBar.jsx";
import CarGrid from "../components/Cars/CarGrid.jsx";
import SortOptions from "../components/Cars/SortOptions.jsx";
import api from "../utils/api";

const CarCollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const SideBarRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (e) => {
    if (SideBarRef.current && !SideBarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get('/cars');
        if (Array.isArray(data)) {
          setCars(data);
        } else {
          console.error("API returned non-array data:", data);
          setCars([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };

    fetchCars();

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter cars based on URL params
  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams]);
    let filtered = [...cars];

    if (queryParams.brand) {
      const brands = queryParams.brand.split(",");
      filtered = filtered.filter((car) => brands.includes(car.make));
    }
    if (queryParams.type) {
      filtered = filtered.filter((car) => car.type === queryParams.type);
    }
    if (queryParams.transmission) {
      filtered = filtered.filter(
        (car) => car.transmission === queryParams.transmission
      );
    }
    if (queryParams.fuelType) {
      filtered = filtered.filter(
        (car) => car.fuelType === queryParams.fuelType
      );
    }
    if (queryParams.seats) {
      const seats = queryParams.seats.split(",");
      filtered = filtered.filter((car) => seats.includes(String(car.seats)));
    }

    const minPrice = Number(queryParams.minPrice) || 0;
    const maxPrice = Number(queryParams.maxPrice) || Infinity;
    filtered = filtered.filter(
      (car) => car.pricePerDay >= minPrice && car.pricePerDay <= maxPrice
    );

    if (collection) {
      filtered = filtered.filter(
        (car) => car.type.toLowerCase() === collection.toLowerCase()
      );
    }

    setFilteredCars(filtered);
  }, [searchParams, collection, cars]);

  return (
    <div className="flex flex-col lg:flex-row bg-black">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center text-white"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      {/* Sidebar */}
      <div
        ref={SideBarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-black text-white transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <CarFilterSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4 text-white">
          {collection ? collection : "All Cars"}
        </h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Car Grid */}
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <CarGrid products={filteredCars} />
        )}
      </div>
    </div>
  );
};

export default CarCollectionPage;
