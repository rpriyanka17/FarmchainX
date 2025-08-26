import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import "./EditProductPages.css";
import { Link } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductsContext);

  const productToEdit = products.find((p) => p.id === parseInt(id));

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Farmer");
  const [soilType, setSoilType] = useState("");
  const [pesticide, setPesticide] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [gpsLocation, setGpsLocation] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");

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
      setImage(productToEdit.image || null);
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category || !price || !status) {
      alert("Please fill all fields!");
      return;
    }

    const updatedProduct = {
      ...productToEdit,
      name,
      category,
      price: parseFloat(price),
      status,
      soilType,
      pesticide,
      harvestDate,
      gpsLocation,
      image: image instanceof File ? URL.createObjectURL(image) : image,
    };

    const updatedProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );

    setProducts(updatedProducts);
    setSuccess("Product updated successfully!");

    // Navigate back to products page after update
    setTimeout(() => {
      navigate("/farmer/products");
    }, 1000);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((p) => p.id !== productToEdit.id);
      setProducts(updatedProducts);

      // Navigate immediately after delete
      navigate("/farmer/products");
    }
  };

  if (!productToEdit) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Product not found!</p>;
  }

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form className="edit-product-form" onSubmit={handleSubmit}>
        {/* Name */}
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {image && typeof image === "string" && (
          <img src={image} alt="Product Preview" className="product-preview" />
        )}

        {/* Crop Type */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Grains">Grains</option>
          <option value="Dairy">Dairy</option>
          <option value="Others">Others</option>
        </select>

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {/* Status */}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Farmer">Farmer</option>
          <option value="Retailer">Retailer</option>
          <option value="Distributor">Distributor</option>
          <option value="Consumer">Consumer</option>
        </select>

        {/* Soil Type */}
        <input
          type="text"
          placeholder="Soil Type"
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
        />

        {/* Pesticides Used */}
        <input
          type="text"
          placeholder="Pesticides Used"
          value={pesticide}
          onChange={(e) => setPesticide(e.target.value)}
        />

        {/* Harvest Date */}
        <input
          type="date"
          value={harvestDate}
          onChange={(e) => setHarvestDate(e.target.value)}
        />

        {/* GPS Location */}
        <input
          type="text"
          placeholder="GPS Location"
          value={gpsLocation}
          onChange={(e) => setGpsLocation(e.target.value)}
        />

        <div className="button-group">
          <button type="submit" className="update-btn">
            Save Changes
          </button>
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
        {success && <p className="success-msg">{success}</p>}
      </form>
    </div>
  );
};

export default EditProductPage;
