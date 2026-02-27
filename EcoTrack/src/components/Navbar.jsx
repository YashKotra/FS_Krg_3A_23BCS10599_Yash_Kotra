import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "15px 20px",
        borderBottom: "1px solid #ccc",
        marginBottom: "16px",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div>
        <Link to="/dashboard" style={{ marginRight: "15px", textDecoration: "none", color: "#333" }}>
          Dashboard
        </Link>
        <Link to="/dashboard/water" style={{ marginRight: "15px", textDecoration: "none", color: "#333" }}>
          Water Tracker
        </Link>
      </div>
      <button onClick={handleLogout} style={{
        padding: "8px 16px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}>Logout</button>
    </nav>
  );
};

export default Navbar;
