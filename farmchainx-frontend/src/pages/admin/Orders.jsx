import React, { useState } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, buyer: "Consumer A", seller: "Farmer X", product: "Tomatoes", qty: 10, date: "2025-08-01", status: "Pending" },
    { id: 2, buyer: "Retailer B", seller: "Farmer Y", product: "Potatoes", qty: 50, date: "2025-08-03", status: "Approved" },
    { id: 3, buyer: "Distributor C", seller: "Farmer Z", product: "Onions", qty: 100, date: "2025-08-05", status: "Shipped" },
  ]);

  const [filter, setFilter] = useState("All");

  // Filter orders
  const filteredOrders =
    filter === "All" ? orders : orders.filter((order) => order.status === filter);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="orders-container">
      <h2>📦 Orders Management</h2>

      {/* Filter Bar */}
      <div className="filter-bar">
        <label>Filter by Status: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="status-select"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.buyer}</td>
              <td>{order.seller}</td>
              <td>{order.product}</td>
              <td>{order.qty}</td>
              <td>{order.date}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="status-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
