import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./FarmerDashboard.css";
import logo from "../assets/f.png";

const FarmerDashboard = ({ onLogout }) => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="logo" />
          <h2>FarmChainX</h2>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/farmer/products"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Products
          </NavLink>

          <NavLink
            to="/farmer/add"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Add Product
          </NavLink>
        </nav>

        <button
          className="logout-btn"
          onClick={() => {
            onLogout();
            window.location.href = "/login"; // redirect after logout
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet /> {/* Nested routes will render here */}
      </main>
    </div>
  );
};

export default FarmerDashboard;
