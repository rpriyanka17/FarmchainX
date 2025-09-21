import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RetailerDashboard.css";
import logo from "../assets/f.png";

const RetailerDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  // Content for each page
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div>
            <h1>📊 Retailer Dashboard</h1>
            
            <div className="card-container">
              <div className="card">📦 120 Items in Stock</div>
              <div className="card">🛒 45 Orders Pending</div>
              <div className="card">💰 ₹85,000 Payments Processed</div>
            </div>
          </div>
        );
      case "stock":
        return (
          <div>
            <h1>📦 Manage Stock</h1>
            <button className="action-btn">➕ Add New Stock</button>
            <button className="action-btn">✏️ Update Stock</button>
            <button className="action-btn">❌ Remove Stock</button>
          </div>
        );
      case "orders":
        return (
          <div>
            <h1>🛒 Orders</h1>
            <button className="action-btn">📋 View All Orders</button>
            <button className="action-btn">✅ Approve Orders</button>
            <button className="action-btn">🚚 Track Deliveries</button>
          </div>
        );
      case "payments":
        return (
          <div>
            <h1>💰 Payments</h1>
            <button className="action-btn">💳 View Payment History</button>
            <button className="action-btn">📥 Pending Payments</button>
            <button className="action-btn">📤 Send Invoice</button>
          </div>
        );
      default:
        return <h1>Welcome, Retailer!</h1>;
    }
  };

  return (
    <div className="retailer-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <img src={logo} alt="FarmChainX Logo" className="logo" />
          <h2>FarmChainX</h2>
        </div>

        <ul>
  <li
    className={activePage === "dashboard" ? "active" : ""}
    onClick={() => setActivePage("dashboard")}
  >
    Dashboard
  </li>
  <li
    className={activePage === "stock" ? "active" : ""}
    onClick={() => setActivePage("stock")}
  >
    Manage Stock
  </li>
  <li
    className={activePage === "orders" ? "active" : ""}
    onClick={() => setActivePage("orders")}
  >
    Orders
  </li>
  <li
    className={activePage === "payments" ? "active" : ""}
    onClick={() => setActivePage("payments")}
  >
    Payments
  </li>
</ul>


        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="content">{renderContent()}</main>
    </div>
  );
};

export default RetailerDashboard;
