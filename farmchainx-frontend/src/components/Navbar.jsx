import { Link } from "react-router-dom";

export default function Navbar({ role }) {
  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🌾 FarmChainX</h1>

        {/* Public links */}
        {!role && (
          <div className="space-x-6">
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link to="/register" className="hover:text-gray-200">Register</Link>
          </div>
        )}

        {/* Farmer Dashboard */}
        {role === "farmer" && (
          <div className="space-x-6">
            <Link to="/farmer/dashboard" className="hover:text-gray-200">Dashboard</Link>
            <Link to="/farmer/products" className="hover:text-gray-200">My Products</Link>
            <Link to="/logout" className="hover:text-gray-200">Logout</Link>
          </div>
        )}

        {/* Admin Dashboard */}
        {role === "admin" && (
          <div className="space-x-6">
            <Link to="/admin/dashboard" className="hover:text-gray-200">Dashboard</Link>
            <Link to="/admin/users" className="hover:text-gray-200">Manage Users</Link>
            <Link to="/admin/reports" className="hover:text-gray-200">Reports</Link>
            <Link to="/logout" className="hover:text-gray-200">Logout</Link>
          </div>
        )}

        {/* Consumer Dashboard (example) */}
        {role === "consumer" && (
          <div className="space-x-6">
            <Link to="/consumer/dashboard" className="hover:text-gray-200">Dashboard</Link>
            <Link to="/consumer/orders" className="hover:text-gray-200">My Orders</Link>
            <Link to="/logout" className="hover:text-gray-200">Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

