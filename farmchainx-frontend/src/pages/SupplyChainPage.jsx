// SupplyChain.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SupplyChain.css";

export default function SupplyChain() {
  const [logs, setLogs] = useState([]);
  const token = localStorage.getItem("token");
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // Replace 1 with any productId you want to test
        const res = await axios.get(`${api}/api/supplychain/1/trace`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch supply chain logs:", err);
      }
    };
    fetchLogs();
  }, [token]);

  return (
    <div className="supplychain-page">
      <h1>Supply Chain Timeline</h1>
      <div className="timeline">
        {logs.map((log, idx) => (
          <div key={idx} className={`timeline-item ${log.stage.toLowerCase()}`}>
            <div className="timeline-stage">{log.stage}</div>
            <div className="timeline-content">
              <h4>{log.action}</h4>
              <p>{log.details}</p>
              <p>Amount: {log.amount}</p>
              <small>{log.actorName} | {new Date(log.timestamp).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
