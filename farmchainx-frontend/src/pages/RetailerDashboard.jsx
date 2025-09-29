import { Link, Outlet, useNavigate } from "react-router-dom";
import "./RetailerDashboard.css";

export default function RetailerDashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout(); // clear user state
    navigate("/login");       // redirect to login
  };

  return (
    <div className="retailer-dashboard">
      {/* Header */}
      <header className="retailer-header">
        <h1>Retailer Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/retailer/add-stock" className="action-card">➕ Add Stock</Link>
          <Link to="/retailer/manage-orders" className="action-card">📦 Manage Orders</Link>
          <Link to="/retailer/payments" className="action-card">💳 Payments</Link>
        </div>
      </section>

      {/* Nested pages */}
      <section className="page-content">
        <Outlet />
      </section>
    </div>
  );
}
