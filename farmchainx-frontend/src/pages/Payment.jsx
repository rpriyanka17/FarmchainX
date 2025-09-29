import React, { useState } from "react";
import "./RetailerPages.css";

export default function Payment() {
  const [payments] = useState([
    { id: "P001", orderId: "O001", amount: 2500, status: "Pending" },
    { id: "P002", orderId: "O002", amount: 4800, status: "Completed" },
  ]);

  return (
    <div className="page-container">
      <h1 className="page-title">💳 Payments</h1>

      <div className="card stats-grid">
        <div className="stat-card">
          <h2>Pending Payments</h2>
          <p>₹75,000</p>
        </div>
        <div className="stat-card">
          <h2>Completed Payments</h2>
          <p>₹3,80,000</p>
        </div>
        <div className="stat-card">
          <h2>Total Revenue</h2>
          <p>₹4,55,000</p>
        </div>
      </div>

      <h2 className="section-title">📋 Payment History</h2>
      <div className="card">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Order ID</th>
              <th>Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.orderId}</td>
                <td>{p.amount}</td>
                <td>
                  <span className={`status-badge ${p.status.toLowerCase()}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
