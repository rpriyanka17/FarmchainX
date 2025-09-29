import React from "react";
import { Outlet } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="admin-dashboard">
      {/* Top bar */}
      <div className="admin-topbar">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Content area */}
      <div className="admin-content">
        <Outlet /> {/* Nested routes like /admin/users, /admin/orders */}
      </div>
    </div>
  );
};

export default AdminDashboard;
