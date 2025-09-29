import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer"); // for UI only
  const [error, setError] = useState("");

  const api = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    try {
      // ✅ Only send email and password to backend
      const res = await axios.post(`${api}/auth/login`, { email, password });

      // Backend returns { token, role, name }
      if (res.data.token) {
        // Save user info in parent (App.jsx)
        onLogin({
          email,
          role: res.data.role.toLowerCase(), // ensure lowercase for routing
          name: res.data.name,
          token: res.data.token,
        });

        // Navigate to proper dashboard based on role
        navigate(`/${res.data.role.toLowerCase()}`);
      } else {
        setError(res.data.message || "❌ Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {/* Role Selection for UI only */}
          <div className="role-selection">
            {["admin", "farmer", "distributor", "retailer", "consumer"].map(r => (
              <label key={r}>
                <input
                  type="radio"
                  value={r}
                  checked={role === r}
                  onChange={e => setRole(e.target.value)}
                />
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </label>
            ))}
          </div>

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
