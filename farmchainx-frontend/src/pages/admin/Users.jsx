import React, { useState } from "react";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Lakshmi", role: "Farmer" },
    { id: 2, name: "Ravi", role: "Consumer" },
    { id: 3, name: "Meena", role: "Retailer" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setUsers(
      users.map((u) => (u.id === currentUser.id ? currentUser : u))
    );
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="users-container">
      <h2 className="users-title">Manage Users</h2>
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
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(u)}
                >
                  Edit
                </button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit User</h3>
            <input
              type="text"
              name="name"
              value={currentUser.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
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
            <div className="modal-actions">
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
