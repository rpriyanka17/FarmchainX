import { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" or "edit"
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [success, setSuccess] = useState("");

  // ✅ API base URL from .env
  const api = import.meta.env.VITE_API_URL;

  // Fetch products from backend on mount
  useEffect(() => {
    axios
      .get(`${api}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, [api]);

  // Input change handler
  const handleChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  // Open Add Product Modal
  const openAddModal = () => {
    setModalType("add");
    setCurrentProduct({ name: "", price: "", stock: "" });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setModalType("edit");
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  // Delete product (backend + frontend)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  // Save product (add or edit)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.price) return;

    try {
      if (modalType === "add") {
        const res = await axios.post(`${api}/api/products`, {
          ...currentProduct,
          price: Number(currentProduct.price),
          stock: Number(currentProduct.stock),
        });
        console.log("✅ Response from backend:", res.data);
        console.log("Sending product to backend:", currentProduct);

        setProducts([...products, res.data]);
        setSuccess("✅ Product added successfully!");
        const updated = await axios.get(`${api}/api/products`);
        setProducts(updated.data);
      } else if (modalType === "edit") {
        const res = await axios.put(
          `${api}/api/products/${currentProduct.id}`,
          {
            ...currentProduct,
            price: Number(currentProduct.price),
            stock: Number(currentProduct.stock),
          }
        );
        setProducts(
          products.map((p) => (p.id === currentProduct.id ? res.data : p))
        );
        setSuccess("✅ Product updated successfully!");
      }
    } catch (err) {
      console.error("❌ Save error:", err);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="products-page">
      <h2>Manage Products 🛒</h2>
      {success && <p className="success-msg">{success}</p>}

      <button className="add-btn" onClick={openAddModal}>
        ➕ Add Product
      </button>

      {products.length === 0 ? (
        <p className="empty-state">No products found. Add some!</p>
      ) : (
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
                  <button className="edit-btn" onClick={() => openEditModal(p)}>
                    Edit
                  </button>
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
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="modal-title">
              {modalType === "edit" ? "Edit Product" : "➕ Add Product"}
            </h3>
            <div className="modal-body">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleChange}
                placeholder="Enter Product Name"
              />
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleChange}
                placeholder="Enter Price"
              />
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={currentProduct.stock}
                onChange={handleChange}
                placeholder="Enter Stock"
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleSave} className="save-btn">
                {modalType === "edit" ? "Save Changes" : "Add Product"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
