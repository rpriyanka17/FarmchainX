import { useState } from "react";
import Modal from "../../components/Modal";

const Sidebar = () => {
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
