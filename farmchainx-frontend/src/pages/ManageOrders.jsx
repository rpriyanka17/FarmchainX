import React, { useState } from "react";
import "./RetailerPages.css";

export default function ManageOrders() {
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || [
      { id: "O001", customer: "Alice", product: "Tomatoes", status: "Pending" },
      { id: "O002", customer: "Bob", product: "Wheat", status: "Shipped" },
    ]
  );

  const updateStatus = (id, newStatus) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div className="page-container">
      <h1 className="page-title">📦 Manage Orders</h1>

      <div className="card">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td>
                  <span className={`status-badge ${o.status.toLowerCase()}`}>
                    {o.status}
                  </span>
                </td>
                <td>
                  <button
                    className="secondary-btn"
                    onClick={() => updateStatus(o.id, "Shipped")}
                  >
                    Ship
                  </button>
                  <button
                    className="secondary-btn danger"
                    onClick={() => updateStatus(o.id, "Cancelled")}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
