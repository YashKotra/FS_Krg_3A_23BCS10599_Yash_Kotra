import { logs } from "../data/logs";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const totalCarbon = logs.reduce((sum, log) => sum + log.carbon, 0);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Navbar />
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Dashboard</h2>
      <div
        className="light-card"
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ fontSize: "18px", marginBottom: "10px" }}>
            Total Carbon Emissions: <strong>{totalCarbon} kg</strong>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
