import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import "./AddProductPage.css";
import axios from "axios";

const AddProductPage = () => {
  const { products, setProducts } = useProducts();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [status, setStatus] = useState("farmer");
  const [price, setPrice] = useState("");
  const [soilType, setSoilType] = useState("");
  const [pesticide, setPesticide] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [gpsLocation, setGpsLocation] = useState("");
  const [image, setImage] = useState(""); // URL string
  const [success, setSuccess] = useState("");

  const api = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !price || !status || !soilType || !harvestDate || !gpsLocation) {
      alert("Please fill in all required fields!");
      return;
    }

    const newProduct = {
      name,
      category,
      status,
      price: parseFloat(price),
      soilType,
      pesticide,
      harvestDate,
      gpsLocation,
      image, // just a URL string, not a file
    };

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${api}/api/products`, newProduct, {
        headers: {
          "Content-Type": "application/json", // 👈 important
          Authorization: token ? `Bearer ${token}` : undefined
        }
      });

      setProducts([...products, res.data]);
      setSuccess("✅ Product added successfully!");

      // Reset form
      setName(""); setCategory("Vegetables"); setStatus("farmer");
      setPrice(""); setSoilType(""); setPesticide(""); setHarvestDate(""); 
      setGpsLocation(""); setImage("");

      setTimeout(() => navigate("/farmer/products"), 1000);

    } catch (err) {
      console.error("Failed to add product:", err);
      alert("❌ Failed to add product. Check backend & JWT.");
    }
  };

  return (
    <div className="add-product-page-container">
      <div className="add-product-container">
        <h2>Add New Product</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="url" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />

          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Grains">Grains</option>
            <option value="Dairy">Dairy</option>
            <option value="Others">Others</option>
          </select>

          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="farmer">Farmer</option>
            <option value="retailer">Retailer</option>
            <option value="distributor">Distributor</option>
            <option value="consumer">Consumer</option>
          </select>

          <input type="text" placeholder="Soil Type" value={soilType} onChange={e => setSoilType(e.target.value)} required />
          <input type="text" placeholder="Pesticide Used" value={pesticide} onChange={e => setPesticide(e.target.value)} />
          <input type="date" value={harvestDate} onChange={e => setHarvestDate(e.target.value)} required />
          <input type="text" placeholder="GPS Location" value={gpsLocation} onChange={e => setGpsLocation(e.target.value)} required />

          <button type="submit">Add Product</button>
          {success && <p className="success-msg">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
