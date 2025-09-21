import React, { useState } from "react";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Lakshmi", role: "Farmer" },
    { id: 2, name: "Ravi", role: "Consumer" },
    { id: 3, name: "Meena", role: "Retailer" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit" or "add"
  const [currentUser, setCurrentUser] = useState(null);

  // Open Add User modal
  const handleAdd = () => {
    setCurrentUser({ id: users.length + 1, name: "", role: "Farmer" });
    setModalType("add");
    setIsModalOpen(true);
  };

  // Open Edit User modal
  const handleEdit = (user) => {
    setCurrentUser(user);
    setModalType("edit");
    setIsModalOpen(true);
  };

  // Save (Add or Edit)
  const handleSave = () => {
    if (modalType === "edit") {
      setUsers(users.map((u) => (u.id === currentUser.id ? currentUser : u)));
    } else {
      setUsers([...users, currentUser]);
    }
    setIsModalOpen(false);
  };

  // Delete
  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // Input change handler
  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="users-container">
      <h2 className="users-title">👥 Manage Users</h2>
      <button className="add-btn" onClick={handleAdd}>➕ Add User</button>

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
                <button className="edit-btn" onClick={() => handleEdit(u)}>
                   Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(u.id)}>
                   Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="modal-title">
              {modalType === "edit" ? " Edit User" : "➕ Add User"}
            </h3>
            <div className="modal-body">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleChange}
                placeholder="Enter Name"
              />

              <label>Role</label>
              <select
                name="role"
                value={currentUser.role}
                onChange={handleChange}
              >
                <option>Farmer</option>
                <option>Consumer</option>
                <option>Retailer</option>
                <option>Distributor</option>
                <option>Admin</option>
              </select>
            </div>
            <div className="modal-actions">
              <button onClick={handleSave} className="save-btn">
                {modalType === "edit" ? "Save Changes" : "Add User"}
              </button>
              <button onClick={() => setIsModalOpen(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
