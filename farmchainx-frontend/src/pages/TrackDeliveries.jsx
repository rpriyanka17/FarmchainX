import React, { useState } from "react";
import "./TrackDeliveries.css";

export default function TrackDeliveries() {
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const deliveries = [
    {
      id: "D001",
      retailer: "Retailer A",
      address: "123 Farm Street, City A",
      contact: "+91 9876543210",
      status: "Out for Delivery",
      products: ["Tomatoes - 50kg", "Wheat - 30kg"],
      expectedDate: "2025-09-30",
      deliveryPerson: "Ravi Kumar",
    },
    {
      id: "D002",
      retailer: "Retailer B",
      address: "456 Green Lane, City B",
      contact: "+91 9123456780",
      status: "Completed",
      products: ["Rice - 40kg", "Potatoes - 20kg"],
      expectedDate: "2025-09-28",
      deliveryPerson: "Anil Sharma",
    },
    {
      id: "D003",
      retailer: "Retailer C",
      address: "789 Harvest Rd, City C",
      contact: "+91 9988776655",
      status: "Pending",
      products: ["Carrots - 15kg", "Spinach - 10kg"],
      expectedDate: "2025-10-01",
      deliveryPerson: "Suman Verma",
    },
  ];

  const openModal = (delivery) => setSelectedDelivery(delivery);
  const closeModal = () => setSelectedDelivery(null);

  return (
    <div className="deliveries-container">
      <h1 className="page-title">📦 Track Deliveries</h1>
      <div className="deliveries-list">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className={`delivery-card ${delivery.status
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
          >
            <div className="delivery-info">
              <h2>{delivery.id}</h2>
              <p>
                Retailer: <span>{delivery.retailer}</span>
              </p>
              <p>
                Status: <span className="status">{delivery.status}</span>
              </p>
            </div>
            <button className="view-btn" onClick={() => openModal(delivery)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDelivery && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Delivery Details - {selectedDelivery.id}</h2>
            <p>
              <strong>Retailer:</strong> {selectedDelivery.retailer}
            </p>
            <p>
              <strong>Contact:</strong> {selectedDelivery.contact}
            </p>
            <p>
              <strong>Address:</strong> {selectedDelivery.address}
            </p>
            <p>
              <strong>Products:</strong>{" "}
              {selectedDelivery.products.join(", ")}
            </p>
            <p>
              <strong>Expected Delivery:</strong> {selectedDelivery.expectedDate}
            </p>
            <p>
              <strong>Delivery Person:</strong> {selectedDelivery.deliveryPerson}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status ${selectedDelivery.status
                .replace(/\s+/g, "-")
                .toLowerCase()}`}>
                {selectedDelivery.status}
              </span>
            </p>
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
