import { useState } from "react";
import "./Products.css";
import Modal from "./Modal"; 

export default function Products() {
  // Dummy product data (later you can fetch from backend)
  const [products, setProducts] = useState([
    { id: 1, name: "Tomatoes", price: 50, stock: 120 },
    { id: 2, name: "Wheat", price: 30, stock: 200 },
    { id: 3, name: "Rice", price: 45, stock: 150 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" or "edit"
  const [currentProduct, setCurrentProduct] = useState(null);

  const openAddModal = () => {
    setModalType("add");
    setCurrentProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setModalType("edit");
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="products-page">
      <h2>Manage Products 🛒</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button className="edit-btn" onClick={() => openEditModal(p)}>Edit</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-btn" onClick={openAddModal}>➕ Add Product</button>
      {showModal && (
        <Modal
          title={modalType === "add" ? "Add Product" : "Edit Product"}
          onClose={handleClose}
        >
          <form>
            <input
              type="text"
              placeholder="Product Name"
              defaultValue={currentProduct?.name || ""}
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />
            <input
              type="text"
              placeholder="Price"
              defaultValue={currentProduct?.price || ""}
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />
            <button
              type="submit"
              style={{
                background: "#10b981",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
