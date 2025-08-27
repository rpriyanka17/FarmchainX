import { Link, Outlet, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import logo from "../assets/f.png";

export default function AdminDashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // clear user state in App.jsx
    }
    navigate("/login"); // go back to login
  };
  
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="logo" />
          <h2>FarmChainX</h2>
        </div>
        <nav className="menu">
          <Link to="/admin" className="menu-item">Dashboard</Link>
          <Link to="/admin/users" className="menu-item">Manage Users</Link>
          <Link to="/admin/products" className="menu-item">Manage Products</Link>
          <Link to="/admin/orders" className="menu-item">Manage Orders</Link>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
