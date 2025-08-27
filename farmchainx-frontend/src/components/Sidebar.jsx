import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-green-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Admin</h2>
      <ul className="space-y-4">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/reports">Reports</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
