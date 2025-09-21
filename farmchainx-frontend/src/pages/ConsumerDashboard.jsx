// ================== ConsumerDashboard.js ==================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader"; // modern QR reader
import "./ConsumerDashboard.css";
import logo from "../assets/f.png";

const ConsumerDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(null); // 'track', 'feedback', 'verify'
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [supplyChainLogs, setSupplyChainLogs] = useState([]);
  const [qrCode, setQrCode] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem("token"); // remove JWT
    navigate("/login");
  };

  // Dummy products & orders
  const products = [
    { id: 1, name: "Tomato", category: "Vegetables", price: 45 },
    { id: 2, name: "Apple", category: "Fruits", price: 120 },
  ];

  const orders = [
    { id: 1, status: "Delivered", total: 850 },
    { id: 2, status: "On the way", total: 1200 },
  ];

  const payments = [{ id: "001", method: "Credit Card", amount: 850 }];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ================== Fake Supply Chain DB ==================
  const fakeSupplyChainData = {
    "1": [
      { stage: "Farmer", actorName: "Farmer John", timestamp: "2025-09-21T08:00:00Z", details: "Harvested 50kg Tomatoes" },
      { stage: "Distributor", actorName: "Dist. FreshFoods", timestamp: "2025-09-21T12:00:00Z", details: "Transported to warehouse, stored at 5°C" },
      { stage: "Retailer", actorName: "Local Mart", timestamp: "2025-09-21T18:00:00Z", details: "Received stock and placed on shelf" },
      { stage: "Consumer", actorName: "You", timestamp: "2025-09-22T10:30:00Z", details: "Purchased 2kg of Tomatoes" },
    ],
    "2": [
      { stage: "Farmer", actorName: "Farmer Lisa", timestamp: "2025-09-20T09:30:00Z", details: "Picked 30 Apples" },
      { stage: "Distributor", actorName: "Dist. AppleCo", timestamp: "2025-09-20T14:00:00Z", details: "Stored in cold warehouse" },
      { stage: "Retailer", actorName: "Fruit Bazaar", timestamp: "2025-09-20T20:00:00Z", details: "Arrived at store, displayed" },
      { stage: "Consumer", actorName: "You", timestamp: "2025-09-21T16:45:00Z", details: "Bought 1kg Apples" },
    ],
  };

  const fetchSupplyChain = (productId) => {
    const data = fakeSupplyChainData[productId] || [];
    setSupplyChainLogs(data);
  };

  const openModal = (type, order = null) => {
    setSelectedOrder(order);
    setModal(type);
    if (type === "track" && order) fetchSupplyChain(order.id);
  };

  const closeModal = () => {
    setModal(null);
    setSelectedOrder(null);
    setSupplyChainLogs([]);
    setQrCode("");
    setRating(0);
    setFeedback("");
  };

  const submitFeedback = () => {
    alert(`Feedback submitted!\nRating: ${rating}\nMessage: ${feedback}`);
    closeModal();
  };

  const submitVerification = () => {
    alert(
      `QR Verified!\nRating: ${rating}\nFeedback: ${feedback}\nQR: ${qrCode}`
    );
    closeModal();
  };

  // ================== Render Pages ==================
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div>
            <h1>Welcome, Consumer!</h1>
            <div className="stats-container">
              <div className="stat-card">
                <h2>{orders.length}</h2>
                <p>Total Orders</p>
              </div>
              <div className="stat-card">
                <h2>3</h2>
                <p>Pending Deliveries</p>
              </div>
              <div className="stat-card">
                <h2>₹{payments.reduce((a, p) => a + p.amount, 0)}</h2>
                <p>Total Spent</p>
              </div>
            </div>
            <div className="quick-actions">
              <button className="action-btn" onClick={() => setActivePage("browse")}>Browse Products</button>
              <button className="action-btn" onClick={() => setActivePage("orders")}>My Orders</button>
              <button className="action-btn" onClick={() => setActivePage("payments")}>Payments</button>
              <button className="action-btn" onClick={() => openModal("verify")}>Customer Verification</button>
            </div>
          </div>
        );
      case "orders":
        return (
          <div>
            <h1>My Orders</h1>
            <div className="card-container">
              {orders.map((o) => (
                <div key={o.id} className="card">
                  <h3>Order #{o.id}</h3>
                  <p>Status: {o.status}</p>
                  <p>Total: ₹{o.total}</p>
                  <button className="action-btn" onClick={() => openModal("track", o)}>Track Order</button>
                  <button className="action-btn" onClick={() => openModal("feedback", o)}>Give Feedback</button>
                </div>
              ))}
            </div>
          </div>
        );
      case "browse":
        return (
          <div>
            <h1>Browse Products</h1>
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
            <div className="card-container">
              {filteredProducts.map((p) => (
                <div key={p.id} className="card">
                  <h3>{p.name}</h3>
                  <p>Category: {p.category}</p>
                  <p>Price: ₹{p.price}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "payments":
        return (
          <div>
            <h1>Payments</h1>
            <div className="card-container">
              {payments.map((p) => (
                <div key={p.id} className="card">
                  <h3>Payment #{p.id}</h3>
                  <p>Method: {p.method}</p>
                  <p>Amount: ₹{p.amount}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="consumer-dashboard">
      <aside className="sidebar">
        <div className="brand">
          <img src={logo} alt="FarmChainX Logo" className="logo" />
          <h2>FarmChainX</h2>
        </div>
        <ul>
          <li className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>Dashboard</li>
          <li className={activePage === "browse" ? "active" : ""} onClick={() => setActivePage("browse")}>Browse Products</li>
          <li className={activePage === "orders" ? "active" : ""} onClick={() => setActivePage("orders")}>My Orders</li>
          <li className={activePage === "payments" ? "active" : ""} onClick={() => setActivePage("payments")}>Payments</li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="content">{renderContent()}</main>

      

      {/* Feedback Modal */}
      {modal === "feedback" && selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <h2>Feedback for Order #{selectedOrder.id}</h2>
            <input type="number" placeholder="Rating (1-5)⭐" value={rating} onChange={(e) => setRating(e.target.value)} />
            <textarea placeholder="Message" value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
            <button className="action-btn" onClick={submitFeedback}>Submit</button>
            <button className="action-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      {/* Supply Chain Trace Modal */}
{modal === "track" && selectedOrder && (
  <div className="modal">
    <div className="modal-content">
      <h2>Supply Chain for Order #{selectedOrder.id}</h2>
      {supplyChainLogs.length > 0 ? (
        <div className="timeline-vertical">
          {supplyChainLogs.map((log, i) => {
            // Determine badge color based on stage
            let stageColor;
            switch (log.stage.toLowerCase()) {
              case "farmer": stageColor = "#16a34a"; break; // green
              case "distributor": stageColor = "#0ea5e9"; break; // blue
              case "retailer": stageColor = "#f59e0b"; break; // amber
              case "consumer": stageColor = "#ef4444"; break; // red
              default: stageColor = "#94a3b8"; // gray
            }

            return (
              <div key={i} className="timeline-step-vertical animate">
                <span
                  className="stage-badge"
                  style={{ backgroundColor: stageColor }}
                >
                  {log.stage}
                </span>
                <p>
                  <strong>{log.actorName}</strong> ({new Date(log.timestamp).toLocaleString()})
                </p>
                <p>{log.details}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No supply chain records found for this order.</p>
      )}
      <button className="action-btn" onClick={closeModal}>Close</button>
    </div>
  </div>
)}


      {/* Customer Verification Modal */}
      {modal === "verify" && (
        <div className="modal">
          <div className="modal-content">
            <h2>Customer Verification & Feedback</h2>
            <p>Scan product QR code:</p>
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={(result, error) => {
                if (!!result) {
                  const scannedQr = result?.text;
                  setQrCode(scannedQr);
                  fetchSupplyChain(scannedQr); // fetch trace automatically
                }
                if (!!error) console.warn(error);
              }}
              style={{ width: "100%" }}
            />
            <p>Rating & Feedback:</p>
            <input type="number" placeholder="Rating (1-5)" value={rating} onChange={(e) => setRating(e.target.value)} />
            <textarea placeholder="Message" value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
            <button className="action-btn" onClick={submitVerification}>Submit</button>
            <button className="action-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerDashboard;
