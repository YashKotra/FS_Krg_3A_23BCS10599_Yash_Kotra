import Car from "../models/Car.js";

// @desc    Fetch all cars
// @route   GET /api/cars
// @access  Public
const getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch single car
// @route   GET /api/cars/:id
// @access  Public
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = async (req, res) => {
  const {
    make,
    model,
    year,
    pricePerDay,
    description,
    features,
    type,
    location,
    imageUrl,
    transmission,
    fuelType,
    seats,
  } = req.body;

  const image = req.file ? req.file.path : imageUrl;

  const car = new Car({
    make,
    model,
    year,
    pricePerDay,
    imageUrl: image,
    description,
    features: features
      ? typeof features === "string"
        ? JSON.parse(features)
        : features
      : [],
    type,
    location: location
      ? typeof location === "string"
        ? JSON.parse(location)
        : location
      : undefined,
    transmission,
    fuelType,
    seats,
  });

  try {
    const createdCar = await car.save();
    res.status(201).json(createdCar);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid car data", error: error.message });
  }
};

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car) {
      await car.deleteOne();
      res.json({ message: "Car removed" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = async (req, res) => {
  const {
    make,
    model,
    year,
    pricePerDay,
    description,
    features,
    type,
    location,
    available,
    transmission,
    fuelType,
    seats,
  } = req.body;

  try {
    const car = await Car.findById(req.params.id);

    if (car) {
      car.make = make || car.make;
      car.model = model || car.model;
      car.year = year || car.year;
      car.pricePerDay = pricePerDay || car.pricePerDay;
      car.description = description || car.description;
      car.type = type || car.type;
      car.available = available !== undefined ? available : car.available;
      car.transmission = transmission || car.transmission;
      car.fuelType = fuelType || car.fuelType;
      car.seats = seats || car.seats;

      if (req.file) {
        car.imageUrl = req.file.path;
      }

      if (features) {
        car.features =
          typeof features === "string" ? JSON.parse(features) : features;
      }

      if (location) {
        car.location =
          typeof location === "string" ? JSON.parse(location) : location;
      }

      const updatedCar = await car.save();
      res.json(updatedCar);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid car data" });
  }
};

export { getCars, getCarById, createCar, deleteCar, updateCar };
