import { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [currentProduct, setCurrentProduct] = useState({ name: "", price: "", image: "" });
  const [success, setSuccess] = useState("");

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${api}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [api]);

  const handleChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setModalType("add");
    setCurrentProduct({ name: "", price: "", image: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setModalType("edit");
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.price) return;

    try {
      if (modalType === "add") {
        const res = await axios.post(`${api}/api/products`, { ...currentProduct, price: Number(currentProduct.price) });
        setProducts([...products, res.data]);
        setSuccess("✅ Product added successfully!");
      } else if (modalType === "edit") {
        const res = await axios.put(`${api}/api/products/${currentProduct.id}`, { ...currentProduct, price: Number(currentProduct.price) });
        setProducts(products.map((p) => (p.id === currentProduct.id ? res.data : p)));
        setSuccess("✅ Product updated successfully!");
      }
    } catch (err) {
      console.error("Save error:", err);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h2>🛒 Manage Products</h2>
      </div>

      {success && <p className="success-msg">{success}</p>}

      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-illustration">📦</div>
          <h3>No products yet</h3>
          <p>Add your first product to get started with your dashboard!</p>
          <button className="empty-add-btn" onClick={openAddModal}>➕ Add Product</button>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              {product.image ? (
                <img src={product.image} alt={product.name} className="product-img"/>
              ) : (
                <div className="no-img">No Image</div>
              )}
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <div className="product-actions">
                <button className="edit-btn" onClick={() => openEditModal(product)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Add Button */}
      <button className="floating-add-btn" onClick={openAddModal}>➕</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{modalType === "edit" ? "Edit Product" : "➕ Add Product"}</h3>
            <input type="text" name="name" value={currentProduct.name} onChange={handleChange} placeholder="Enter Product Name" />
            <input type="number" name="price" value={currentProduct.price} onChange={handleChange} placeholder="Enter Price" />
            <input type="text" name="image" value={currentProduct.image} onChange={handleChange} placeholder="Enter Image URL" />
            {currentProduct.image && <img src={currentProduct.image} alt="preview" className="preview-img" />}
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>{modalType === "edit" ? "Save Changes" : "Add Product"}</button>
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
