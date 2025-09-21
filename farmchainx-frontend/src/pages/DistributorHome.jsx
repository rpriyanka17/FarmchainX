import React from "react";
import "./DistributorHome.css";

export default function DistributorHome() {
  return (
    <div>
      <h1>Distributor Dashboard</h1>
      <div className="card-grid">
        <div className="card">
          <h2>Orders</h2>
          <p>128 total orders this month</p>
        </div>
        <div className="card">
          <h2>Deliveries</h2>
          <p>92 deliveries completed</p>
        </div>
        <div className="card">
          <h2>Payments</h2>
          <p>₹4,50,000 received</p>
        </div>
        <div className="card">
          <h2>Performance</h2>
          <p>98% on-time delivery</p>
        </div>
      </div>
    </div>
  );
}
