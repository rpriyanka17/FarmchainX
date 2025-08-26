import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useProducts();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width="200" />
      <p><b>Category:</b> {product.category}</p>
      <p><b>Status:</b> {product.status}</p>
      <p><b>Price:</b> ₹{product.price}</p>
      <p><b>Description:</b> {product.description || "No description available"}</p>
    </div>
  );
};

export default ProductDetailPage;
