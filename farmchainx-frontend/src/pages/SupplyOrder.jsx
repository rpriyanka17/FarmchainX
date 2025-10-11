import React, { useState } from "react";
import SupplyChainPage from "./SupplyChainPage";


export default function SupplyOrder() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fake DB with 4 orders
  const fakeOrders = [
    {
      id: 1,
      product: "Tomatoes",
      quantity: "50 kg",
      status: "In Hand - Farmer",
      logs: [
        {
          stage: "Farmer",
          action: "Harvested",
          details: "Fresh tomatoes picked.",
          actorName: "John Doe",
          timestamp: "2025-09-29T10:30:00Z",
        },
        {
          stage: "Distributor",
          action: "In Transit",
          details: "Shipped to retailer.",
          actorName: "DHL Logistics",
          timestamp: "2025-09-30T09:00:00Z",
        },
      ],
    },
    {
      id: 2,
      product: "Wheat",
      quantity: "200 kg",
      status: "In Transit - Distributor",
      logs: [
        {
          stage: "Farmer",
          action: "Harvested",
          details: "Grains collected from field.",
          actorName: "Raj Singh",
          timestamp: "2025-09-28T08:00:00Z",
        },
        {
          stage: "Distributor",
          action: "Shipped",
          details: "On the way to retailer.",
          actorName: "Agro Logistics",
          timestamp: "2025-09-29T12:00:00Z",
        },
      ],
    },
    {
      id: 3,
      product: "Rice",
      quantity: "100 kg",
      status: "Reached Consumer",
      logs: [
        {
          stage: "Farmer",
          action: "Harvested",
          details: "Basmati rice processed.",
          actorName: "Anil Kumar",
          timestamp: "2025-09-25T07:00:00Z",
        },
        {
          stage: "Distributor",
          action: "Delivered to Retailer",
          details: "Stocked at Big Bazaar.",
          actorName: "Green Supply",
          timestamp: "2025-09-26T15:00:00Z",
        },
        {
          stage: "Consumer",
          action: "Purchased",
          details: "Bought by customer.",
          actorName: "Priya Sharma",
          timestamp: "2025-09-27T10:00:00Z",
        },
      ],
    },
    {
      id: 4,
      product: "Apples",
      quantity: "75 kg",
      status: "Future Arrival",
      logs: [
        {
          stage: "Farmer",
          action: "Preparing for Harvest",
          details: "Expected in 2 days.",
          actorName: "Orchard Farm",
          timestamp: "2025-10-02T00:00:00Z",
        },
      ],
    },
  ];

  return (
    <div className="orders-page">
      {!selectedOrder ? (
        <>
          <h1>Orders</h1>
          <div className="orders-grid">
            {fakeOrders.map((order) => (
              <div className="order-card" key={order.id}>
                <h2>{order.product}</h2>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <button onClick={() => setSelectedOrder(order)}>
                  View Supply Chain
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <SupplyChainPage
          order={selectedOrder}
          goBack={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
