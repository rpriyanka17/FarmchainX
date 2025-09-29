import { Link } from "react-router-dom";
import logo from "../assets/f.png";
import "./Navbar.css";

export default function Navbar({ role }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo on the left */}
        <div className="logo">
          <img src={logo} alt="FarmChainX Logo" className="logo-img" />
          <span className="logo-text">FarmChainX</span>
        </div>

        {/* Links on the right */}
        <div className="nav-links">
          {/* Always show Home */}
          <Link to="/" className="nav-link">Home</Link>

          {!role && (
            <>
              <Link to="/register" className="nav-link">Get Started</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </>
          )}

          {role === "farmer" && (
            <>
              <Link to="/farmer/" className="nav-link">Dashboard</Link>
              <Link to="/farmer/products" className="nav-link">My Products</Link>
              <Link to="/farmer/add" className="nav-link">Add Products</Link>
              
            </>
          )}

          {role === "admin" && (
            <>
              <Link to="/admin" className="nav-link">Dashboard</Link>

              <Link to="/admin/users" className="nav-link">Users</Link>
              <Link to="/admin/products" className="nav-link">Products</Link>
              <Link to="/admin/orders" className="nav-link">Orders</Link>
              
            </>
          )}

          {role === "distributor" && (
            <>
              <Link to="/distributor/" className="nav-link">Dashboard</Link>
              <Link to="/distributor/orders" className="nav-link">Orders</Link>
              <Link to="/distributor/deliveries" className="nav-link">Deliveries</Link>
              <Link to="/distributor/payments" className="nav-link">Payments</Link>
              
            </>
          )}

          {role === "retailer" && (
            <>
              <Link to="/retailer/dashboard" className="nav-link">Dashboard</Link>
              
            </>
          )}

          {role === "consumer" && (
  <>
    <Link to="/consumer/" className="nav-link">Dashboard</Link>
    <Link to="/consumer/fruit-quality" className="nav-link">AI Quality Check</Link>
    <Link to="/consumer/scan-product" className="nav-link">Verify Product</Link>
    <Link to="/consumer/supply-chain" className="nav-link">Supply Chain</Link>
    
  </>
)}
        </div>
      </div>
    </nav>
  );
}
