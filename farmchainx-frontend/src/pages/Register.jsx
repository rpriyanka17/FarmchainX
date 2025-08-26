import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/f.png";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("farmer"); // default role
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type === "radio" ? "role" : e.target.type]: e.target.value });
  }; 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle registration logic, including selected role
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (users.find((u) => u.email === formData.email)) {
      alert("User already exists!");
      return;
    }

    // Save new user
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" /> FarmChainX
        </div>
        <div className="links">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>

      {/* Register Form */}
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <input 
            type="email" 
            placeholder="Email" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            required 
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          {/* Role Selection */}
          <div className="role-selection">
            <label>
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              /> Admin
            </label>
            <label>
              <input
                type="radio"
                value="farmer"
                checked={role === "farmer"}
                onChange={(e) => setRole(e.target.value)}
              /> Farmer
            </label>
            <label>
              <input
                type="radio"
                value="distributor"
                checked={role === "distributor"}
                onChange={(e) => setRole(e.target.value)}
              /> Distributor
            </label>
            <label>
              <input
                type="radio"
                value="retailer"
                checked={role === "retailer"}
                onChange={(e) => setRole(e.target.value)}
              /> Retailer
            </label>
            <label>
              <input
                type="radio"
                value="consumer"
                checked={role === "consumer"}
                onChange={(e) => setRole(e.target.value)}
              /> Consumer
            </label>
          </div>

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </>
  );
};

export default Register;

