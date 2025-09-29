import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("farmer");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const api = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post(`${api}/auth/register`, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role
      });
      alert(res.data.message || "✅ Registration successful! Please login.");
    navigate("/login");
    } catch(err){
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" required value={formData.fullName} onChange={e=>setFormData({...formData, fullName:e.target.value})}/>
          <input type="email" placeholder="Email" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})}/>
          <input type="password" placeholder="Password" required value={formData.password} onChange={e=>setFormData({...formData, password:e.target.value})}/>
          <input type="password" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={e=>setFormData({...formData, confirmPassword:e.target.value})}/>

          <div className="role-selection">
            {["admin","farmer","distributor","retailer","consumer"].map(r => (
              <label key={r}>
                <input type="radio" value={r} checked={role===r} onChange={e=>setRole(e.target.value)}/>
                {r.charAt(0).toUpperCase()+r.slice(1)}
              </label>
            ))}
          </div>

          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
