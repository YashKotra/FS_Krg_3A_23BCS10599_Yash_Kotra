import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import CarCollection from "./pages/CarCollection";
import CarDetail from "./components/Cars/CarDetails";
import Profile from "./pages/Profile";
import Login from "./pages/login";
import Signup from "./pages/signup";
import MyBookings from "./pages/MyBookings";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminBookings from "./pages/Admin/AdminBookings";
import AdminCars from "./pages/Admin/AdminCars";
import AdminUsers from "./pages/Admin/AdminUsers";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="cars" element={<CarCollection />} />
          <Route path="cars/:collection" element={<CarCollection />} />
          <Route path="car/:id" element={<CarDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="cars" element={<AdminCars />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
