// DistributorDashboard.jsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./DistributorDashboard.css";

export default function DistributorDashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="distributor-dashboard-full">
      {/* Header with Logout */}
      <header className="dashboard-header">
        <h1>Distributor Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="content-full">
        <Outlet />
      </main>
    </div>
  );
}
