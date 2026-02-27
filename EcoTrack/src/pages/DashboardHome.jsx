import React from "react";
import { logs } from "../data/logs";

const DashboardHome = () => {
  const total = logs.length;
  const totalCarbon = logs.reduce((sum, log) => sum + log.carbon, 0);

  return (
    <div>
      <h3>Summary of Activities</h3>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.activity}: {log.carbon} kg CO₂
          </li>
        ))}
      </ul>
      <p>Total logs: {total}</p>
      <p>Total carbon: {totalCarbon} kg</p>
    </div>
  );
};

export default DashboardHome;
