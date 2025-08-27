import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useProducts();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-container">
        <h2 style={{ color: "red", fontWeight: "bold" }}>❌ Product not found</h2>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
        <div className="product-card">
            <div className="product-image">
                <img src={product.image || "https://via.placeholder.com/300"} alt={product.name} />
            </div>

        <div className="product-details">
          <h1>{product.name}</h1>
          <div className="product-info">
            <p>📂 Category: {product.category}</p>
            <p>✅ Status: {product.status}</p>
            <p>🌱 Soil Type: {product.soilType}</p>
            <p>🧴 Pesticide: {product.pesticide}</p>
            <p>📅 Harvest Date: {product.harvestDate}</p>
            <p>📍 GPS Location: {product.gpsLocation}</p>
          </div>
          <div className="product-price">💰 Price: ₹{product.price}</div>
          <button className="buy-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
