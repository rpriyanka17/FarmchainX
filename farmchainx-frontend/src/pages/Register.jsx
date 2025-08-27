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

  const handleSubmit = (e) => {
    e.preventDefault();

    // check passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check if email already exists
    if (users.find((u) => u.email === formData.email)) {
      alert("User already exists!");
      return;
    }

    // create new user
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
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          {/* Role Selection */}
          <div className="role-selection">
            {["admin", "farmer", "distributor", "retailer", "consumer"].map(
              (r) => (
                <label key={r}>
                  <input
                    type="radio"
                    value={r}
                    checked={role === r}
                    onChange={(e) => setRole(e.target.value)}
                  />{" "}
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </label>
              )
            )}
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
