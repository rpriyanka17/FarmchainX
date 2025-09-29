import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./FarmerDashboard.css";

const FarmerDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="farmer-dashboard">
      {/* Top bar */}
      <div className="farmer-topbar">
        <h2>Farmer Dashboard</h2>
        <div className="topbar-buttons">
          
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="farmer-content">
        <Outlet /> {/* Nested routes like /farmer/products, /farmer/add */}
      </div>
    </div>
  );
};

export default FarmerDashboard;
