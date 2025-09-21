// DistributorDashboard.jsx
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./DistributorDashboard.css";
import logo from "../assets/f.png";

export default function DistributorDashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="distributor-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="logo" />
          <h2>FarmChainX</h2>
        </div>
        <nav className="menu">
          <Link to="/distributor" className="menu-item">Dashboard</Link>
          <Link to="/distributor/orders" className="menu-item">Manage Orders</Link>
          <Link to="/distributor/deliveries" className="menu-item">Track Deliveries</Link>
          <Link to="/distributor/payments" className="menu-item">Payments</Link>
          
      
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

