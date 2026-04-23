import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import filterData from "../../assets/data/carFilters.json";

const CarFilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    types: [],
    transmissions: [],
    fuelTypes: [],
    seats: [],
    priceRange: { min: 0, max: 0 },
  });

  const [filter, setFilter] = useState({
    brand: [],
    type: "",
    transmission: "",
    fuelType: "",
    seats: [],
    minPrice: 0,
    maxPrice: 0,
  });

  useEffect(() => {
    setFilterOptions(filterData);
    setFilter((prev) => ({
      ...prev,
      minPrice: filterData.priceRange.min,
      maxPrice: filterData.priceRange.max,
    }));
  }, []);

  // Read filters from URL
  useEffect(() => {
    const urlBrand = searchParams.get("brand")?.split(",") || [];
    const urlType = searchParams.get("type") || "";
    const urlTransmission = searchParams.get("transmission") || "";
    const urlFuel = searchParams.get("fuelType") || "";
    const urlSeats = searchParams.get("seats")?.split(",") || [];
    const urlMinPrice =
      Number(searchParams.get("minPrice")) || filterData.priceRange.min;
    const urlMaxPrice =
      Number(searchParams.get("maxPrice")) || filterData.priceRange.max;

    setFilter({
      brand: urlBrand,
      type: urlType,
      transmission: urlTransmission,
      fuelType: urlFuel,
      seats: urlSeats,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
    });
  }, [searchParams]);

  const updateURLParams = (filters) => {
    const params = new URLSearchParams();
    if (filters.brand.length > 0) params.set("brand", filters.brand.join(","));
    if (filters.type) params.set("type", filters.type);
    if (filters.transmission) params.set("transmission", filters.transmission);
    if (filters.fuelType) params.set("fuelType", filters.fuelType);
    if (filters.seats.length > 0) params.set("seats", filters.seats.join(","));
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    setSearchParams(params);
  };

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilter((prev) => {
      const updated = { ...prev };
      if (type === "checkbox") {
        const current = prev[name] || [];
        updated[name] = checked
          ? [...current, value]
          : current.filter((v) => v !== value);
      } else {
        updated[name] = value;
      }
      updateURLParams(updated);
      return updated;
    });
  };

  const handlePriceChange = (e) => {
    const newMaxPrice = Number(e.target.value);
    const newFilter = { ...filter, maxPrice: newMaxPrice };
    setFilter(newFilter);
    updateURLParams(newFilter);
  };

  return (
    <div className="p-4 bg-black text-white rounded-lg shadow-md w-full md:w-64">
      <h3 className="text-xl font-medium mb-4">Filters</h3>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Brand</label>
        {filterOptions.brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filter.brand.includes(brand)}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 accent-white"
            />
            <span>{brand}</span>
          </div>
        ))}
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Type</label>
        {filterOptions.types.map((type) => (
          <div key={type} className="flex items-center mb-1">
            <input
              type="radio"
              name="type"
              value={type}
              checked={filter.type === type}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 accent-white"
            />
            <span>{type}</span>
          </div>
        ))}
      </div>

      {/* Transmission Filter */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Transmission</label>
        {filterOptions.transmissions.map((trans) => (
          <div key={trans} className="flex items-center mb-1">
            <input
              type="radio"
              name="transmission"
              value={trans}
              checked={filter.transmission === trans}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 accent-white"
            />
            <span>{trans}</span>
          </div>
        ))}
      </div>

      {/* Fuel Type Filter */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Fuel Type</label>
        {filterOptions.fuelTypes.map((fuel) => (
          <div key={fuel} className="flex items-center mb-1">
            <input
              type="radio"
              name="fuelType"
              value={fuel}
              checked={filter.fuelType === fuel}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 accent-white"
            />
            <span>{fuel}</span>
          </div>
        ))}
      </div>

      {/* Seats Filter */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Seats</label>
        {filterOptions.seats.map((seat) => (
          <div key={seat} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="seats"
              value={seat}
              checked={filter.seats.includes(seat)}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 accent-white"
            />
            <span>{seat}</span>
          </div>
        ))}
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <label className="block font-medium mb-2">Price Range</label>
        <input
          type="range"
          step={1000}
          min={filterOptions.priceRange.min}
          max={filterOptions.priceRange.max}
          value={filter.maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-700 rounded-lg accent-white"
        />
        <div className="flex justify-between mt-2">
          <span>₹{filter.minPrice.toLocaleString()}</span>
          <span>₹{filter.maxPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CarFilterSidebar;
