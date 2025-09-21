import React from "react";
import "./ManageOrder.css";

export default function ManagaeOrder() {
  return (
    <div>
      <h1>Manage Orders</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Retailer</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#ORD123</td>
            <td>Retailer A</td>
            <td>2025-08-25</td>
            <td><span className="status pending">Pending</span></td>
          </tr>
          <tr>
            <td>#ORD124</td>
            <td>Retailer B</td>
            <td>2025-08-24</td>
            <td><span className="status inprogress">In Progress</span></td>
          </tr>
          <tr>
            <td>#ORD125</td>
            <td>Retailer C</td>
            <td>2025-08-23</td>
            <td><span className="status completed">Completed</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
