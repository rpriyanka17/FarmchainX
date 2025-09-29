import React from "react";
import "./Payments.css";

export default function Payments() {
  const recentTransactions = [
    { id: "TXN001", retailer: "Retailer A", amount: 50000, status: "Pending", date: "2025-09-25" },
    { id: "TXN002", retailer: "Retailer B", amount: 75000, status: "Completed", date: "2025-09-24" },
    { id: "TXN003", retailer: "Retailer C", amount: 1_00_000, status: "Completed", date: "2025-09-23" },
    { id: "TXN004", retailer: "Retailer D", amount: 25_000, status: "Pending", date: "2025-09-22" },
  ];

  return (
    <div className="payments-page">
      <h1>💰 Payments Dashboard</h1>

      {/* Summary Cards */}
      <div className="card-grid">
        <div className="summary-card pending">
          <h2>Pending Payments</h2>
          <p>₹75,000</p>
        </div>
        <div className="summary-card completed">
          <h2>Completed Payments</h2>
          <p>₹3,80,000</p>
        </div>
        <div className="summary-card total">
          <h2>Total Revenue</h2>
          <p>₹4,55,000</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Retailer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>{txn.retailer}</td>
                <td>{txn.date}</td>
                <td>₹{txn.amount.toLocaleString()}</td>
                <td>
                  <span className={`status ${txn.status.toLowerCase()}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
