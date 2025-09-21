import React from "react";
import "./TrackDeliveries.css";

export default function TrackDeliveries() {
  const deliveries = [
    { id: "D001", retailer: "Retailer A", status: "Out for Delivery" },
    { id: "D002", retailer: "Retailer B", status: "Completed" },
    { id: "D003", retailer: "Retailer C", status: "Pending" },
  ];

  return (
    <div className="deliveries-container">
      <h1 className="page-title">📦 Track Deliveries</h1>
      <div className="deliveries-list">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className={`delivery-card ${delivery.status.replace(/\s+/g, "-").toLowerCase()}`}>
            <div className="delivery-info">
              <h2>{delivery.id}</h2>
              <p>Retailer: <span>{delivery.retailer}</span></p>
              <p>Status: <span className="status">{delivery.status}</span></p>
            </div>
            <button className="view-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
