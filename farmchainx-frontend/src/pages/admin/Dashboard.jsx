import { useState } from "react";
import Cards from "../../components/Cards";
import "./Dashboard.css";

const Dashboard = () => {
  // State
  const [farmers, setFarmers] = useState([
    { id: 1, name: "Ramesh", approved: false },
    { id: 2, name: "Kavya", approved: false },
  ]);
  const [products, setProducts] = useState([
    { id: 1, name: "Wheat", qty: 100, category: "Grains" },
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: "Lakshmi", role: "Farmer" },
    { id: 2, name: "Ravi", role: "Consumer" },
    { id: 3, name: "Meena", role: "Retailer" },
  ]);
  const [modal, setModal] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", qty: "", category: "" });
  const [recentActivity, setRecentActivity] = useState([
    "✅ Farmer John registered",
    "🌾 20 Products added",
    "⏳ 5 Approvals pending",
  ]);

  // Handlers
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.qty) return;
    setProducts([
      ...products,
      { id: Date.now(), name: newProduct.name, qty: newProduct.qty, category: newProduct.category },
    ]);
    setRecentActivity([`🌾 Added ${newProduct.qty} ${newProduct.name}`, ...recentActivity]);
    setNewProduct({ name: "", qty: "", category: "" });
    setModal(null);
  };

  const handleApproveFarmer = (id) => {
    setFarmers(farmers.map(f => f.id === id ? { ...f, approved: true } : f));
    const farmer = farmers.find(f => f.id === id);
    setRecentActivity([`✔ Approved ${farmer.name}`, ...recentActivity]);
  };

  const handleGenerateReport = (type) => {
    setRecentActivity([`📄 Generated ${type} report`, ...recentActivity]);
    setModal(null);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    setRecentActivity([`🗑️ Deleted user with ID ${id}`, ...recentActivity]);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>📊 FarmChainX Overview</h2>
        <div className="dashboard-actions">
          <input type="text" placeholder="🔍 Search..." className="search-bar" />
          <button className="profile-btn">Admin</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-grid">
        <Cards title="👨‍🌾 Farmers" value={farmers.length} />
        <Cards title="🌾 Products" value={products.length} />
        <Cards title="🛒 Consumers" value="150"  />
        <Cards title="⏳ Pending Approvals" value={farmers.filter(f => !f.approved).length}  />
      </div>

      {/* Widgets */}
      <div className="dashboard-row">
        <div className="widget">
          <h3>🔔 Recent Activity</h3>
          <ul>
            {recentActivity.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="widget">
          <h3>⚡ Quick Actions</h3>
          <button className="btn" onClick={() => setModal("product")}>➕ Add Product</button>
          <button className="btn" onClick={() => setModal("farmer")}>✔ Approve Farmer</button>
          <button className="btn" onClick={() => setModal("report")}>📄 Generate Report</button>
          <button className="btn" onClick={() => setModal("users")}>👥 Manage Users</button>
        </div>
      </div>

      {/* MODALS with Overlay */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal-card">
            {/* Add Product */}
            {modal === "product" && (
              <>
                <h3>➕ Add Product</h3>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newProduct.qty}
                  onChange={(e) => setNewProduct({ ...newProduct, qty: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
                <div className="modal-actions">
                  <button className="save-btn" onClick={handleAddProduct}>Save</button>
                  <button className="cancel-btn" onClick={() => setModal(null)}>Cancel</button>
                </div>
              </>
            )}

            {/* Approve Farmer */}
            {modal === "farmer" && (
              <>
                <h3>✔ Approve Farmer</h3>
                <ul>
                  {farmers.filter(f => !f.approved).map(farmer => (
                    <li key={farmer.id}>
                      👨‍🌾 {farmer.name}{" "}
                      <button className="save-btn" onClick={() => handleApproveFarmer(farmer.id)}>Approve</button>
                    </li>
                  ))}
                </ul>
                <div className="modal-actions">
                  <button className="cancel-btn" onClick={() => setModal(null)}>Close</button>
                </div>
              </>
            )}

            {/* Generate Report */}
            {modal === "report" && (
              <>
                <h3>📄 Generate Report</h3>
                <select id="report-type">
                  <option value="Farmers">Farmers Report</option>
                  <option value="Products">Products Report</option>
                  <option value="Consumers">Consumers Report</option>
                </select>
                <div className="modal-actions">
                  <button
                    className="save-btn"
                    onClick={() => handleGenerateReport(document.getElementById("report-type").value)}
                  >
                    Download
                  </button>
                  <button className="cancel-btn" onClick={() => setModal(null)}>Cancel</button>
                </div>
              </>
            )}

            {/* Manage Users */}
            {modal === "users" && (
              <>
                <h3>👥 Manage Users</h3>
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.role}</td>
                        <td>
                          <button className="delete-btn" onClick={() => handleDeleteUser(u.id)}>🗑️ Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="modal-actions">
                  <button className="cancel-btn" onClick={() => setModal(null)}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
