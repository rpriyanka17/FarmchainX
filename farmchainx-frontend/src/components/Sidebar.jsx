import { Link } from "react-router-dom";
import Modal from "./Modal";


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
  const [openModal, setOpenModal] = useState(null);

  return (
    <div className="sidebar">
      <h2>FarmChainX</h2>
      <button onClick={() => setOpenModal("addProduct")}>➕ Add Product</button>
      <button onClick={() => setOpenModal("approveFarmer")}>✅ Approve Farmer</button>
      <button onClick={() => setOpenModal("report")}>📄 Generate Report</button>

      {/* Popups */}
      {openModal === "addProduct" && (
        <Modal title="Add Product" onClose={() => setOpenModal(null)}>
          <form>
            <input type="text" placeholder="Product Name" required />
            <input type="number" placeholder="Quantity" required />
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}

      {openModal === "approveFarmer" && (
        <Modal title="Approve Farmer" onClose={() => setOpenModal(null)}>
          <p>List of pending farmers will be shown here...</p>
          <button>Approve</button>
        </Modal>
      )}

      {openModal === "report" && (
        <Modal title="Generate Report" onClose={() => setOpenModal(null)}>
          <p>Select report type:</p>
          <button>Download PDF</button>
          <button>Download Excel</button>
        </Modal>
      )}
    </div>
  );
};

export default Sidebar;
