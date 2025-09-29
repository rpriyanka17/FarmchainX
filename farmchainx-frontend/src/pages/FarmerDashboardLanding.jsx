import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerDashboardLanding.css";

const FarmerDashboardLanding = ({ onLogout }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Fake data (replace with backend later)
  const products = [
    { id: 1, name: "Tomatoes", stock: 4 },
    { id: 2, name: "Wheat", stock: 20 },
    { id: 3, name: "Mangoes", stock: 3 },
    { id: 4, name: "Onions", stock: 8 },
  ];

  const orders = [
    { id: 101, product: "Tomatoes", buyer: "Rahul", status: "Pending", totalPrice: 500 },
    { id: 102, product: "Wheat", buyer: "Meena", status: "Shipped", totalPrice: 1200 },
    { id: 103, product: "Mangoes", buyer: "Arjun", status: "Delivered", totalPrice: 800 },
    { id: 104, product: "Onions", buyer: "Priya", status: "Pending", totalPrice: 600 },
    { id: 105, product: "Tomatoes", buyer: "Ravi", status: "Shipped", totalPrice: 450 },
  ];

  const tips = [
    "Rotate your crops to prevent soil depletion.",
    "Check irrigation levels daily.",
    "Use organic fertilizers for better yield.",
    "Monitor weather to avoid crop loss.",
    "Keep equipment well maintained.",
  ];

  const news = [
    "Market price of tomatoes rises 15% this week.",
    "Government subsidy announced for small farmers.",
    "Upcoming light rains may improve wheat yield.",
    "Local cooperative launches new training sessions.",
    "Farmers urged to check soil quality before planting.",
  ];

  useEffect(() => {
    // Simulate fetch delay
    setTimeout(() => setLoading(false), 800);
  }, []);

  // Fake Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const shippedOrders = orders.filter((o) => o.status === "Shipped").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const lowStock = products.filter((p) => p.stock <= 5);

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="farmer-landing-pro">
      {/* Top bar */}
      <div className="top-bar-pro">
        <h2>🌾 Welcome to Your Smart Dashboard</h2>
        <div className="top-buttons">
          
          
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid-pro">
        {[
          { label: "Total Products", value: totalProducts, color: "#22c55e" },
          { label: "Total Orders", value: totalOrders, color: "#3b82f6" },
          { label: "Pending Orders", value: pendingOrders, color: "#facc15" },
          { label: "Shipped Orders", value: shippedOrders, color: "#14b8a6" },
          { label: "Total Revenue", value: `₹${totalRevenue}`, color: "#10b981" },
          { label: "Low Stock", value: lowStock.length, color: "#ef4444" },
        ].map((stat, i) => (
          <div key={i} className="stat-card-pro" style={{ borderTopColor: stat.color }}>
            <p className="stat-label">{stat.label}</p>
            <h3 className="stat-value">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Tips & News */}
      <div className="tips-news-grid-pro">
        <div className="tips-card-pro">
          <h3>💡 Farmer Tips</h3>
          <ul>
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
        <div className="news-card-pro">
          <h3>📰 Latest News</h3>
          <ul>
            {news.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Low Stock */}
      <div className="trending-products-pro">
        <h3>📉 Low Stock Alerts</h3>
        <div className="products-grid-pro">
          {lowStock.length === 0 ? (
            <p>✅ All products are well stocked!</p>
          ) : (
            lowStock.map((p) => (
              <div key={p.id} className="product-card-pro">
                <h4>{p.name}</h4>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${Math.min((p.stock / 20) * 100, 100)}%` }}
                  ></div>
                </div>
                <p>Stock left: {p.stock}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders-pro">
        <h3>🛒 Recent Orders</h3>
        {orders.slice(-5).reverse().map((o) => (
          <div key={o.id} className="order-card-pro">
            <p>
              <strong>{o.product}</strong> ordered by <b>{o.buyer}</b>
            </p>
            <p>
              Status:{" "}
              <span className={`status ${o.status.toLowerCase()}`}>{o.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerDashboardLanding;
