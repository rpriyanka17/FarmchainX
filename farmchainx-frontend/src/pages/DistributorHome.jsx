import React from "react";
import "./DistributorHome.css";
import { FaTruck, FaMoneyBillWave, FaClipboardList, FaChartLine, FaExclamationTriangle, FaBoxOpen } from "react-icons/fa";

export default function DistributorHome() {
  // Fake recent orders
  const recentOrders = [
    { id: 101, product: "Tomatoes", qty: 50, status: "Delivered" },
    { id: 102, product: "Wheat", qty: 100, status: "Pending" },
    { id: 103, product: "Apples", qty: 75, status: "In Transit" },
    { id: 104, product: "Potatoes", qty: 60, status: "Delivered" },
  ];

  // Fake alerts/tips
  const alerts = [
    "Ensure timely pickup of all orders to maintain delivery performance.",
    "Check inventory levels daily to avoid shortages.",
    "Update delivery status immediately after dispatch.",
    "Verify payment confirmations weekly."
  ];

  return (
    <div className="distributor-home">
      

      {/* Stats Cards */}
      <div className="card-grid">
        <div className="card">
          <FaClipboardList className="card-icon" />
          <h2>Orders</h2>
          <p>128 total orders this month</p>
        </div>
        <div className="card">
          <FaTruck className="card-icon" />
          <h2>Deliveries</h2>
          <p>92 deliveries completed</p>
        </div>
        <div className="card">
          <FaMoneyBillWave className="card-icon" />
          <h2>Payments</h2>
          <p>₹4,50,000 received</p>
        </div>
        <div className="card">
          <FaChartLine className="card-icon" />
          <h2>Performance</h2>
          <p>98% on-time delivery</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: "98%" }}></div>
          </div>
        </div>
      </div>

      {/* Alerts + Recent Orders */}
      <div className="flex-cards">
        {/* Alerts Card */}
        <div className="card alerts-card">
          <h2><FaExclamationTriangle /> Distributor Alerts</h2>
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>

        {/* Recent Orders Card */}
        <div className="card recent-card">
          <h2><FaBoxOpen /> Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product}</td>
                  <td>{order.qty}</td>
                  <td className={order.status.toLowerCase().replace(" ", "-")}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
