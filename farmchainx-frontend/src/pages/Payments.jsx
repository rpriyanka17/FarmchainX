import React from "react";
import "./Payments.css"

export default function Payments() {
  return (
    <div>
      <h1>Payments</h1>
      <div className="card-grid">
        <div className="card">
          <h2>Pending Payments</h2>
          <p>₹75,000</p>
        </div>
        <div className="card">
          <h2>Completed Payments</h2>
          <p>₹3,80,000</p>
        </div>
        <div className="card">
          <h2>Total Revenue</h2>
          <p>₹4,55,000</p>
        </div>
      </div>
    </div>
  );
}
