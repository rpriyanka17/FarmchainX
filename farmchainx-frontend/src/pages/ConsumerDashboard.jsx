import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./ConsumerDashboard.css";

export default function ConsumerDashboard({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="consumer-dashboard">
      {/* Top bar with title and logout */}
      <header className="consumer-topbar">
        <h1 className="consumer-title" onClick={() => navigate("/consumer")}>
          Welcome, Consumer
        </h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      {/* Main content area */}
      <main className="consumer-content">
        <Outlet />
      </main>
    </div>
  );
}
