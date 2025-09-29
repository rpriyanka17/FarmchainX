import React, { useState } from "react";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Lakshmi", role: "Farmer" },
    { id: 2, name: "Ravi", role: "Consumer" },
    { id: 3, name: "Meena", role: "Retailer" },
    { id: 4, name: "Arjun", role: "Distributor" },
    { id: 5, name: "Priya", role: "Admin" },
    { id: 6, name: "Kiran", role: "Farmer" },
    { id: 7, name: "Neha", role: "Consumer" },
    { id: 8, name: "Vikram", role: "Retailer" },
    { id: 9, name: "Sita", role: "Distributor" },
    { id: 10, name: "Manoj", role: "Admin" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit" or "add"
  const [currentUser, setCurrentUser] = useState(null);

  const handleAdd = () => {
    setCurrentUser({ id: users.length + 1, name: "", role: "Farmer" });
    setModalType("add");
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!currentUser.name) return; // simple validation
    if (modalType === "edit") {
      setUsers(users.map(u => (u.id === currentUser.id ? currentUser : u)));
    } else {
      setUsers([...users, currentUser]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>👥 Manage Users</h2>
        <button className="btn-add" onClick={handleAdd}>➕ Add User</button>
      </div>

      <div className="users-grid">
        {users.map(user => (
          <div className="user-card" key={user.id}>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.role}</p>
            </div>
            <div className="user-actions">
              <button className="btn-edit" onClick={() => handleEdit(user)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{modalType === "edit" ? "Edit User" : "➕ Add User"}</h3>
            <input
              type="text"
              name="name"
              value={currentUser.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
            <select name="role" value={currentUser.role} onChange={handleChange}>
              <option>Farmer</option>
              <option>Consumer</option>
              <option>Retailer</option>
              <option>Distributor</option>
              <option>Admin</option>
            </select>
            <div className="modal-actions">
              <button className="btn-save" onClick={handleSave}>
                {modalType === "edit" ? "Save Changes" : "Add User"}
              </button>
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
