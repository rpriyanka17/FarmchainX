import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import "./ProductsPage.css";

function ProductsPage() {
  const { products, setProducts } = useProducts();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token"); // JWT token

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${api}/api/products`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        alert("Check your API URL or login token!");
      }
    };
    fetchProducts();
  }, [token]);

  // Filter + search
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus
      ? p.status?.trim().toLowerCase() === filterStatus.toLowerCase()
      : true;
    return matchesSearch && matchesStatus;
  });

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${api}/api/products/${id}`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert("Failed to delete product. Check backend.");
      }
    }
  };

  // Download QR as PNG
  const handleDownloadQR = (id) => {
    const canvas = document.getElementById(`qr-${id}`);
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `product-${id}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print QR
  const handlePrintQR = (id) => {
    const canvas = document.getElementById(`qr-${id}`);
    const dataUrl = canvas.toDataURL("image/png");
    const windowContent = `
      <!DOCTYPE html>
      <html>
      <head><title>Print QR</title></head>
      <body>
        <h3>Product QR Code</h3>
        <img src="${dataUrl}" style="width:200px; height:200px;" />
        <p>Scan this QR to view product details</p>
      </body>
      </html>`;
    const printWin = window.open("", "", "width=400,height=400");
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.print();
  };

  return (
    <div className="products-page">
      <h1>Welcome, Farmer</h1>
      <h2>Farm Products</h2>

      {/* Search + Filter */}
      <div className="filter-row">
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="farmer">Farmer</option>
          <option value="retailer">Retailer</option>
          <option value="distributor">Distributor</option>
          <option value="consumer">Consumer</option>
        </select>
      </div>

      {/* Products Table */}
      <table className="products-table">
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
                  <img src={p.image || "https://via.placeholder.com/80"} alt={p.name} />
                </td>
                <td>{p.category || "-"}</td>
                <td>₹{p.price}</td>
                <td>{p.status || "-"}</td>
                <td>{p.soilType || "-"}</td>
                <td>{p.pesticide || "-"}</td>
                <td>{p.harvestDate || "-"}</td>
                <td>{p.gpsLocation || "-"}</td>
                <td className="action-buttons">
                  <button onClick={() => navigate(`/farmer/products/edit/${p.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                  <button onClick={() => handleDownloadQR(p.id)}>Download QR</button>
                  <button onClick={() => handlePrintQR(p.id)}>Print QR</button>
                </td>
                <td style={{ textAlign: "center" }}>
                  <div
                    onClick={() => navigate(`/farmer/product/${p.id}`)}
                    style={{ cursor: "pointer", display: "inline-block" }}
                  >
                    <QRCodeCanvas
                      id={`qr-${p.id}`}
                      value={`${window.location.origin}/#/farmer/product/${p.id}`} // for scanning externally
                      size={80}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>
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
