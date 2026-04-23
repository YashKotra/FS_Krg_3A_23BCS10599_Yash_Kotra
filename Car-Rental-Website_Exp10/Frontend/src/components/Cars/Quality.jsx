import React from "react";

const Quality = () => {
  return (
    <div>
      <div className="py-16 px-4 bg-black flex flex-col md:flex-row gap-8">
        {/* 1  Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center ml-2">
          <img
            src="https://images.unsplash.com/photo-1625690180114-5530b1304127?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"
            alt="car interior"
            className="aspect-3/2 object-cover w-full border-4 border-white border-solid rounded-xl"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="text-center p-6 rounded-lg shadow-md">
            <h2 className="text-6xl font-semibold uppercase mb-4 text-white">
              Quality vehicles just right for you
            </h2>
            <p className="text-white text-2xl mx-auto ">
              Our wide range of new vehicles, from small cars to large SUVs,
              means you have lots of options to book the perfect trip for you.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 bg-black flex flex-col md:flex-row gap-8">
        {/* 2  Text Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="text-center p-6 rounded-lg shadow-md">
            <h2 className="text-6xl font-semibold uppercase mb-4 text-white">
              Regular Maintenance & Quality Assurance
            </h2>
            <p className="text-white text-2xl mx-auto ">
              Every vehicle is thoroughly inspected, maintained, and insured
              before each rental — ensuring safety, performance, and a
              worry-free experience
            </p>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1661544083412-01f93afba702?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FyJTIwc3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700"
            alt="car interior"
            className="aspect-3/2 object-cover w-full border-4 border-white border-solid rounded-xl"
          />
        </div>
      </div>

      <div className="py-16 px-4 bg-black flex flex-col md:flex-row gap-8">
        {/* 3  Image Section */}
        <div className="ml-2 w-full md:w-1/2 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928"
            alt="car interior"
            className="aspect-3/2 object-cover w-full border-4 border-white border-solid rounded-xl"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="text-center p-6 rounded-lg shadow-md">
            <h2 className="text-6xl font-semibold uppercase mb-4 text-white">
              Ridiculously Simple Pick-up & Drop-off
            </h2>
            <p className="text-white text-2xl mx-auto ">
              Choose your convenient location and time for pick-up and drop-off
              — no hassle, no waiting.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 bg-black flex flex-col md:flex-row gap-8">
        {/* 4  Text Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="text-center p-6 rounded-lg shadow-md">
            <h2 className="text-6xl font-semibold uppercase mb-4 text-white">
              Outstanding On-Road Support
            </h2>
            <p className="text-white text-2xl mx-auto ">
              Enjoy 24/7 roadside assistance for breakdowns, flat tires, or any
              unexpected issues — wherever the road takes you.
            </p>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1596383765797-8e10e88d1590?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670"
            alt="car interior"
            className="aspect-3/2 object-cover w-full border-4 border-white border-solid rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Quality;
