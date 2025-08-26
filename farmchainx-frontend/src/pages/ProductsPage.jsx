import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import "./ProductsPage.css";
import { QRCodeCanvas } from "qrcode.react";
import ProductDetailPage from "./ProductDetailPage";


function ProductsPage() {
  const { products = [],setProducts } = useProducts();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  

  // Filter + search 
  const filteredProducts = products.filter((p) => {
  const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
  const matchesStatus = filterStatus
    ? p.status?.trim().toLowerCase() === filterStatus.toLowerCase()
    : true;
  return matchesSearch && matchesStatus;
  });
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>Farm Products</h2>

      {/* Search + Status Filter */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", width: "250px" }}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="">All Status</option>
          <option value="farmer">Farmer</option>
          <option value="retailer">Retailer</option>
          <option value="distributor">Distributor</option>
          <option value="consumer">Consumer</option>
        </select>
      </div>

      {/* Products Table */}
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Crop Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Soil Type</th>
            <th>Pesticides Used</th>
            <th>Harvest Date</th>
            <th>GPS Location</th>
            <th>Actions</th>
            <th>QR Code</th>

          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.name || "-"}</td>
                <td>
                  <img
                    src={p.image || "https://via.placeholder.com/80"}
                    alt={p.name}
                    width="80"
                  />
                </td>
                <td>{p.category || "-"}</td>
                <td>₹{p.price}</td> 
                <td>{p.status || "-"}</td>
                
                <td>{p.soilType || "-"}</td>
                <td>{p.pesticide || "-"}</td>
                <td>{p.harvestDate || "-"}</td>
                <td>{p.gpsLocation || "-"}</td>
                <td>
                  {/*Edit and Delete buttons */}
                  <Link to={`/farmer/products/edit/${p.id}`}>
                    <button style={{ marginRight: "5px" }}>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
                <td>
                  <QRCodeCanvas
                    value={`http://192.168.130.226:5175/#/farmer/product/${p.id}`}
                    size={80}
                  />

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;
