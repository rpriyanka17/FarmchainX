// src/pages/SupplyChainPage.jsx
import React, { useState } from "react";
import "./SupplyChainPage.css";

const fakeOrders = [
  {
    id: 1,
    name: "Order 1 - Tomatoes",
    timeline: [
      { status: "In Farmer's Hand", date: "2025-09-20" },
      { status: "In Distributor's Hub", date: "2025-09-22" },
      { status: "Reached Retailer", date: "2025-09-24" },
      { status: "Future Arrival to Consumer", date: "2025-09-29" },
    ],
  },
  {
    id: 2,
    name: "Order 2 - Wheat",
    timeline: [
      { status: "In Farmer's Hand", date: "2025-09-18" },
      { status: "In Distributor's Hub", date: "2025-09-21" },
      { status: "Future Arrival to Retailer", date: "2025-09-30" },
    ],
  },
  {
    id: 3,
    name: "Order 3 - Apples",
    timeline: [
      { status: "In Farmer's Hand", date: "2025-09-10" },
      { status: "In Distributor's Hub", date: "2025-09-15" },
      { status: "Reached Retailer", date: "2025-09-18" },
      { status: "Reached Consumer", date: "2025-09-19" },
    ],
  },
  {
    id: 4,
    name: "Order 4 - Rice",
    timeline: [
      { status: "In Farmer's Hand", date: "2025-09-12" },
      { status: "Future Arrival to Distributor", date: "2025-10-01" },
    ],
  },
];

export default function SupplyChainPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="supplychain-container">
      <h1 className="supplychain-title">📦 Supply Chain Tracking</h1>

      <div className="orders-grid">
        {fakeOrders.map((order) => (
          <div
            key={order.id}
            className={`order-card ${
              selectedOrder?.id === order.id ? "active" : ""
            }`}
            onClick={() =>
              setSelectedOrder(selectedOrder?.id === order.id ? null : order)
            }
          >
            <div className="order-header">
              <h2>{order.name}</h2>
              <p>Order ID: #{order.id}</p>
            </div>

            {selectedOrder?.id === order.id && (
              <div className="timeline">
                <h3>Supply Chain Status</h3>
                {order.timeline.map((step, idx) => (
                  <div className="timeline-item" key={idx}>
                    <span className="timeline-dot"></span>
                    <h4>{step.status}</h4>
                    <time>{step.date}</time>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
