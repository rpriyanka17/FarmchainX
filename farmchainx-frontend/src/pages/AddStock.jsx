import React, { useState } from "react";
import "./RetailerPages.css";

export default function AddStock() {
  const [stock, setStock] = useState({ name: "", quantity: "", price: "" });
  const [stocks, setStocks] = useState(
    JSON.parse(localStorage.getItem("stocks")) || []
  );

  const handleChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const updated = [...stocks, { ...stock, id: Date.now() }];
    setStocks(updated);
    localStorage.setItem("stocks", JSON.stringify(updated));
    setStock({ name: "", quantity: "", price: "" });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">➕ Add Stock</h1>

      <div className="card form-card">
        <input
          type="text"
          name="name"
          value={stock.name}
          placeholder="Product Name"
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          value={stock.quantity}
          placeholder="Quantity"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={stock.price}
          placeholder="Price"
          onChange={handleChange}
        />
        <button className="primary-btn" onClick={handleAdd}>
          Add Stock
        </button>
      </div>

      <h2 className="section-title">📦 Current Stock</h2>
      <div className="card">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.quantity}</td>
                <td>{s.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
