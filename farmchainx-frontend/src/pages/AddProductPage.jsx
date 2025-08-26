import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import "./AddProductPage.css";

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
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !price || !status || !soilType || !harvestDate || !gpsLocation) {
      alert("Please fill in all required fields!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      category,
      status,
      price: parseFloat(price),
      soilType,
      pesticide,
      harvestDate,
      gpsLocation,
      image: image ? URL.createObjectURL(image) : "", // temporary preview
    };

    setProducts([...products, newProduct]);

    // Reset form
    setName("");
    setCategory("Vegetables");
    setStatus("farmer");
    setPrice("");
    setSoilType("");
    setPesticide("");
    setHarvestDate("");
    setGpsLocation("");
    setImage(null);
    setSuccess("Product added successfully!");
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Grains">Grains</option>
          <option value="Dairy">Dairy</option>
          <option value="Others">Others</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="farmer">Farmer</option>
          <option value="retailer">Retailer</option>
          <option value="distributor">Distributor</option>
          <option value="consumer">Consumer</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Soil Type"
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Pesticide Used"
          value={pesticide}
          onChange={(e) => setPesticide(e.target.value)}
          required
        />

        <input
          type="date"
          placeholder="Harvest Date"
          value={harvestDate}
          onChange={(e) => setHarvestDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="GPS Location"
          value={gpsLocation}
          onChange={(e) => setGpsLocation(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Add Product</button>
        {success && <p className="success-msg">{success}</p>}
      </form>
    </div>
  );
};

export default AddProductPage;
