import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import CarGrid from "../components/Cars/CarGrid";
import Quality from "../components/Cars/Quality";
import Steps from "../components/Cars/Steps";
import Reviews from "../components/Cars/Reviews";
import api from "../utils/api";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get("/cars");
        console.log("Fetched cars:", data); // Debug log
        if (Array.isArray(data)) {
          // Show only first 8 cars or best sellers
          setCars(data.slice(0, 8));
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
  }, []);

  return (
    <div className="bg-black">
      <Hero />

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Featured Cars
        </h2>
        {loading ? (
          <p className="text-white text-center">Loading cars...</p>
        ) : (
          <CarGrid products={cars} />
        )}
      </div>

      <Quality />
      <Steps />
    </div>
  );
};

export default Home;
