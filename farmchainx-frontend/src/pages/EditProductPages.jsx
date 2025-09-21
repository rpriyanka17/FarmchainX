import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import "./EditProductPages.css";
import axios from "axios";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductsContext);

  const productToEdit = products.find(p => p.id === parseInt(id));

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Farmer");
  const [soilType, setSoilType] = useState("");
  const [pesticide, setPesticide] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [gpsLocation, setGpsLocation] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState("");

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || "");
      setCategory(productToEdit.category || "Vegetables");
      setPrice(productToEdit.price || "");
      setStatus(productToEdit.status || "Farmer");
      setSoilType(productToEdit.soilType || "");
      setPesticide(productToEdit.pesticide || "");
      setHarvestDate(productToEdit.harvestDate || "");
      setGpsLocation(productToEdit.gpsLocation || "");
      setImage(productToEdit.image || "");
    }
  }, [productToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productToEdit) return;

    const updatedProduct = {
      name, category, price: parseFloat(price), status,
      soilType, pesticide, harvestDate, gpsLocation, image
    };

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${api}/api/products/${productToEdit.id}`, updatedProduct, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined }
      });

      const updatedProducts = products.map(p => p.id === res.data.id ? res.data : p);
      setProducts(updatedProducts);
      setSuccess("✅ Product updated successfully!");

      setTimeout(() => navigate("/farmer/products"), 1000);

    } catch (err) {
      console.error("Failed to update product:", err);
      alert("❌ Could not update product. Check backend & JWT.");
    }
  };

  const handleDelete = async () => {
    if (!productToEdit) return;
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${api}/api/products/${productToEdit.id}`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
        setProducts(products.filter(p => p.id !== productToEdit.id));
        navigate("/farmer/products");
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert("❌ Could not delete product.");
      }
    }
  };

  if (!productToEdit) return <p style={{ textAlign: "center", marginTop: "50px" }}>Product not found!</p>;

  return (
    <div className="edit-product-page-container">
      <div className="edit-product-container">
        <h2>Edit Product</h2>
        <form className="edit-product-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="url" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
          {image && <img src={image} alt="Preview" className="product-preview" />}
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Grains">Grains</option>
            <option value="Dairy">Dairy</option>
            <option value="Others">Others</option>
          </select>
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Farmer">Farmer</option>
            <option value="Retailer">Retailer</option>
            <option value="Distributor">Distributor</option>
            <option value="Consumer">Consumer</option>
          </select>
          <input type="text" placeholder="Soil Type" value={soilType} onChange={e => setSoilType(e.target.value)} />
          <input type="text" placeholder="Pesticides Used" value={pesticide} onChange={e => setPesticide(e.target.value)} />
          <input type="date" value={harvestDate} onChange={e => setHarvestDate(e.target.value)} />
          <input type="text" placeholder="GPS Location" value={gpsLocation} onChange={e => setGpsLocation(e.target.value)} />

          <div className="button-group">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleDelete}>Delete Product</button>
          </div>
          {success && <p className="success-msg">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
