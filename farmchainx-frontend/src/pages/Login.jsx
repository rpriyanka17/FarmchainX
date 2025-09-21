import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/f.png";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer"); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedInUser = onLogin(email, password, role);

    if (loggedInUser) {
      // Navigate to the role-specific dashboard
      navigate(`/${loggedInUser.role}`);
    } else {
      alert("Login failed!");
    }
  };
  
  
  

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" /> FarmChainX
        </div>
        <div className="links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      {/* Login Form */}
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Role selection */}
          <p>Select Role:</p>
          <div className="role-selection">
            {["admin","farmer","distributor","retailer","consumer"].map(r => (
              <label key={r}>
                <input
                  type="radio"
                  value={r}
                  checked={role === r}
                  onChange={(e) => setRole(e.target.value)}
                /> 
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </label>
            ))}
          </div>

          <button type="submit">Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <p>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
