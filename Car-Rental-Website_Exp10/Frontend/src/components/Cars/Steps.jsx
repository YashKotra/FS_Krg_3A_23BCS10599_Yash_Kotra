import React from "react";

const steps = [
  {
    title: "Choose Your Car",
    description:
      "Browse our wide selection of vehicles and select the perfect one for your trip.",
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Select Location & Date",
    description:
      "Pick your preferred pick-up and drop-off locations and rental duration.",
    image:
      "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Book Instantly",
    description:
      "Confirm your booking and receive instant confirmation via email or SMS.",
    image:
      "https://images.unsplash.com/photo-1635548166842-bf67bacbefaa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Enjoy Your Ride",
    description: "Pick up your car and hit the road — it’s that simple!",
    image:
      "https://images.unsplash.com/photo-1638210574680-b30164f073f3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=800",
  },
];

const BookingProcess = () => {
  return (
    <div className="bg-black">
      <h2 className="text-6xl font-bold text-center uppercase text-white pt-16 mb-8">
        How It Works
      </h2>

      {steps.map((step, index) => (
        <div
          key={index}
          className={`py-16 px-4 bg-black flex flex-col md:flex-row gap-8 ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image Section */}
          <div
            className={`w-full md:w-1/2 flex items-center justify-center ${
              index % 2 === 0 ? "ml-2" : "mr-2"
            }`}
          >
            <img
              src={step.image}
              alt={step.title}
              className="aspect-3/2 object-cover w-full border-4 border-white border-solid rounded-xl"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="text-center p-6 rounded-lg shadow-md">
              <h3 className="text-6xl font-semibold uppercase mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-white text-2xl mx-auto">{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingProcess;
