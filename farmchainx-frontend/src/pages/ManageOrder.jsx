import React, { useState } from "react";
import "./ManageOrder.css";

export default function ManageOrders() {
  const [orders, setOrders] = useState([
    { id: "#ORD123", retailer: "Retailer A", date: "2025-08-25", status: "Pending" },
    { id: "#ORD124", retailer: "Retailer B", date: "2025-08-24", status: "In Progress" },
    { id: "#ORD125", retailer: "Retailer C", date: "2025-08-23", status: "Completed" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({ id: "", retailer: "", date: "", status: "Pending" });

  const openAddModal = () => {
    setEditingOrder(null);
    setFormData({ id: "", retailer: "", date: "", status: "Pending" });
    setModalOpen(true);
  };

  const openEditModal = (order) => {
    setEditingOrder(order.id);
    setFormData(order);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingOrder) {
      setOrders(orders.map(order => order.id === editingOrder ? formData : order));
    } else {
      setOrders([...orders, { ...formData, id: `#ORD${Math.floor(Math.random()*1000)}` }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="manage-orders-container">
      <div className="header">
        <h1>Manage Orders</h1>
        <button className="add-btn" onClick={openAddModal}>Add Order</button>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Retailer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.retailer}</td>
              <td>{order.date}</td>
              <td>
                <span className={`status ${order.status.toLowerCase().replace(" ", "-")}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <button className="edit-btn" onClick={() => openEditModal(order)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>{editingOrder ? "Edit Order" : "Add Order"}</h2>
            <form onSubmit={handleFormSubmit} className="order-form">
              <label>
                Retailer
                <input type="text" name="retailer" value={formData.retailer} onChange={handleFormChange} required />
              </label>
              <label>
                Date
                <input type="date" name="date" value={formData.date} onChange={handleFormChange} required />
              </label>
              <label>
                Status
                <select name="status" value={formData.status} onChange={handleFormChange}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
              <div className="modal-buttons">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
